import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import coffeeStoresData from "../../data/coffee-stores.json";
import {BiLocationPlus} from "react-icons/bi";
import {BsFillHandThumbsUpFill,BsFillArrowLeftCircleFill} from "react-icons/bs";
import fetchCoffeeStores from "../../data/apiFetch";
import {Grid,Fab} from "@mui/material";

export async function getStaticProps(staticProps){
	const params= staticProps.params.id;
	console.log(params)
	let data= await fetchCoffeeStores();
	return {
		props:{
			coffeeStore:data.filter(item=>{
				return item.name===params
			})
		}
	}
}

export async function getStaticPaths(){
	let data= await fetchCoffeeStores();
	const paths= data.map(coffeeStore=>{
		return {params:{id:coffeeStore.name}}
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
		console.log(props.coffeeStore[0].name)
	}


	return (
		<div className={styles.layout}>

			<Head>
				<title>{props.coffeeStore[0].name}</title>
			</Head>

			<div className={styles.container}>

				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Fab className={styles.fab}variant="extended">	
							<Link href="/" >
								<a>Back to home</a>
							</Link>
						</Fab>
							
						
					</div>
					<div className={styles.imgWrapper}>
						<h1 className={styles.Name}>{props.coffeeStore[0].name}</h1>
						<Image className={styles.storeImg} src={props.coffeeStore[0].imgUrl} alt={props.coffeeStore[0].name} width={500}height={360}/>
					</div>
				</div>


				<div className={styles.col2}>
					<div className={styles.iconWrapper}>
						<BiLocationPlus size={25} className={styles.icon}/>
						<p className={styles.text}>{props.coffeeStore[0].location.address},{props.coffeeStore[0].location.locality}</p>
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
