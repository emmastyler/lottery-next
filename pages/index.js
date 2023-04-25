import Head from 'next/head'
import Web3 from 'web3'
import contractDetails from '../lottery'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  //Web3 states values 
  const [web3, setWeb3] = useState()
  const [lottery, setLottery] = useState()

  //Contract States  values
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  

  useEffect(() =>{

    //Calling methods on the contract
    async function fetchAddress(){
      //Allow metamask
      window.ethereum.request({method: 'eth_requestAccounts' })
      const web3 = new  Web3(window.ethereum)
      setWeb3(web3)
      const lottery =  new web3.eth.Contract(contractDetails.abi, contractDetails.address)
      setLottery(lottery) 
      //make calls to the contract in blockchain
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address)

      //populate state values
      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    
    }

    fetchAddress()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting on transaction success...')

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })
    setMessage('You have been entered')
  }

  const handleWinner = async () => {
    const accounts = await web3.eth.getAccounts()
    setMessage('Waiting on transaction success...')
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    setMessage('A winner has been picked!')
  }

  return (
    <>
      <Head>
        <title>Lottery Contract</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
{/*         <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
        <div className="App">
     <h2>Lottery Contract</h2>
     <p>This contract is managed by {manager}. There are currently {players.length} people entered, competing to win {web3?.utils?.fromWei(balance, 'ether')} ether!</p>
     <hr />
     <form onSubmit={handleSubmit}>
      <h4>Want to try your Luck?</h4>
      <div>
        <label>Amount of ether to enter</label>
        <input value={value} onChange={(e)=> setValue(e.target.value)} required/>
      </div>
      <button >Enter</button>
     </form>
     <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={handleWinner}>Pick a winner</button>
     <hr />
     <h1>{message}</h1>
    </div>

      </main>
    </>
  )
}