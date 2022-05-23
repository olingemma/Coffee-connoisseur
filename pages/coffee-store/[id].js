import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import coffeeStoresData from "../../data/coffee-stores.json";
import {BiLocationPlus} from "react-icons/bi";
import {BsFillHandThumbsUpFill,BsFillArrowLeftCircleFill} from "react-icons/bs";

export async function getStaticProps(staticProps){
	const params=staticProps.params
	console.log("params",params)
	return {
		props:{
			coffeeStore:coffeeStoresData.find((coffeeStore)=>{
				return coffeeStore.id.toString()===params.id
			})
		}
	}
}

export function getStaticPaths(){
	const paths= coffeeStoresData.map(coffeeStore=>{
		return {params:{id:coffeeStore.id.toString()}}
	})
	console.log("paths",paths)
	return {
		paths,
		fallback:false
	}
}

const CoffeeStore=(props)=>{
	const router = useRouter();

	if(router.isFallback){
		return <div>Loading...</div>
	}

	function handleUpvoteButton(){
		console.log("upvote")
	}


	return (
		<div className={styles.layout}>

			<Head>
				<title>{props.coffeeStore.name}</title>
			</Head>

			<div className={styles.container}>

				<div className={styles.col1}>

					<div className={styles.backToHomeLink}>
					<BsFillArrowLeftCircleFill/>
						<Link href="/" >
							<a>Back to home</a>
						</Link>
					</div>


					<div className={styles.imgWrapper}>
						<h1 className={styles.Name}>{props.coffeeStore.name}</h1>
					</div>


					<Image src={props.coffeeStore.imgUrl} width={600} height={360} className={styles.storeImg} alt={props.coffeeStore.name}/>
				</div>


				<div className={styles.col2}>
					<div className={styles.iconWrapper}>
						<BiLocationPlus size={25} className={styles.icon}/>
						<p className={styles.text}>{props.coffeeStore.address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<BiLocationPlus size={25} className={styles.icon}/>
						<p className={styles.text}>{props.coffeeStore.neighbourhood}</p>
					</div>
					<div className={styles.iconWrapper}>
						<BsFillHandThumbsUpFill size={25}/>
						<p className={styles.text}>1</p>
					</div>
					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote</button>
				</div>

			</div>
		</div>
	)

}
export default CoffeeStore
