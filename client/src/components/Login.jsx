import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import FontIcon from 'material-ui/FontIcon';
import LoginCrodityAccount from './LoginCrodityAccount.jsx';
import { ButtonsLoginLogin } from './LoginButtons';
import { Helpers } from '../helpers/Helpers.jsx';
import i18n from 'meteor/universe:i18n';
import AppBar from 'material-ui/AppBar';
import Carousel from 'react-bootstrap/lib/Carousel';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { List, ListItem } from 'material-ui/List';
import Cookie from 'js-cookie';
import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';


const T = i18n.createComponent();

const styleFab = {
	margin: 0,
	top: 'auto',
	right: 20,
	bottom: 20,
	left: 'auto',
	position: 'fixed',
};
const styles = {
	AppBar: {
		height: '70px',
		backgroundColor: 'rgba(255,255,255, 0.4)',
		position: 'absolute',
		boxShadow: 'none'
	},
	LogoAppBar: {
		height: '50px',
		marginTop: '10px',
		width: 'auto'
	},
	LoginAppBar: {
		marginTop: '15px',
		marginRight: '30px'
	},
	LoginButtons: {
		display: 'inline-block'
	},
	CarouselStyle: {
		marginTop: '71px'
	},
	ButtonSaiba: {
		webkitTextFillColor: 'black',
		fontFamily: "Raleway",
		marginRight: '10px'
	},
	TextStyle: {
		fontFamily: "Raleway",
		color: '#424753',
		marginTop: '20px'
	},
	SlideTextStyle: {
		fontFamily: "Raleway"
	},
	Cards: {
		boxShadow: "none",
		margin: '25px',
		marginTop: '20px',
		marginBottom: '80px',
		fontSize: '18px'
	},
	TitleCards: {
		fontSize: '25px',
		fontWeight: '600'
	},
	MainTitle: {
		marginTop: '80px',
		fontWeight: '600',
		fontSize: '30px',
		fontFamily: "Raleway",
		marginBottom: '40px'
	},
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
	slide: {
		padding: 10
	},
}

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			slideIndex: 2,
			size: $(window).width(),
			fab: false
		};
	}

	handleTouchTap(event) {
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose() {
		this.setState({
			open: false,
		});
	};

	handleChange(value) {
		this.setState({
			slideIndex: value,
		});
	};

	handleChangeFab() {
		document.body.scrollTop > 500 ? this.setState({ fab: true }) : this.setState({ fab: false })
	}

	scrollToBegin() {
		const node = ReactDOM.findDOMNode(this.refs.startDiv);
		node.scrollIntoView({ behavior: "smooth" });
	}

	scrollToMiddle() {
		const node = ReactDOM.findDOMNode(this.refs.middleDiv);
		node.scrollIntoView({ behavior: "smooth" });
	}

	scrollToBottom() {
		const node = ReactDOM.findDOMNode(this.refs.bottomDiv);
		node.scrollIntoView({ behavior: "smooth" });
	}

	scrollToTop() {
		const node = ReactDOM.findDOMNode(this.refs.firstDiv);
		node.scrollIntoView({ behavior: "smooth" });

	}

	componentDidMount() {
		// Helpers.defineLanguage();
		window.onscroll = this.handleChangeFab.bind(this)
	}

	componentWillMount() {
		let pathname = window.location.pathname
		let index = pathname.indexOf("affiliate") + 10;
		let _id = pathname.substring(index);
		Cookie.set('_id', _id, { expires: 30 })
	}

	render() {
		return (

			<div className="container container-login" ref="firstDiv">
				<AppBar
					iconElementLeft={<div>{(this.state.size >= 600) ?
						<img className='logo responsive' src="/img/logo_crodity.png"
							alt="Crodity Logo" style={styles.LogoAppBar} /> :
						<img className='logo responsive' src="/img/logo_crodity.png"
							alt="Crodity Logo" style={{ marginTop: '10px', width: 'auto' }} />}
					</div>}

					iconStyleLeft={{ width: '600px', height: '70px' }}

					iconElementRight={<div>
						{(this.state.size >= 600 ? <div>
							<RaisedButton
								label="Conheça o Crodity"
								labelPosition="before"
								labelColor="black"
								style={styles.ButtonSaiba}
								onTouchTap={(event) => this.scrollToBegin(event)}
							/>
							<RaisedButton
								label="Apresentação"
								labelPosition="before"
								labelColor="black"
								style={styles.ButtonSaiba}
								onTouchTap={(event) => this.scrollToMiddle(event)}
							/>
							<RaisedButton
								label="Nossos planos"
								labelPosition="before"
								labelColor="black"
								style={styles.ButtonSaiba}
								onTouchTap={(event) => this.scrollToBottom(event)}
							/>
							<RaisedButton
								onTouchTap={(event) => this.handleTouchTap(event)}
								label="Sign in"
								backgroundColor='#ffca43'
								style={styles.LoginAppBar}
							/>
							<Popover
								open={this.state.open}
								anchorEl={this.state.anchorEl}
								anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
								targetOrigin={{ horizontal: 'left', vertical: 'top' }}
								onRequestClose={(event) => this.handleRequestClose(event)}
							>
								<Menu>
									<ButtonsLoginLogin />
								</Menu>
							</Popover>
						</div>
							:
							<div>
								<RaisedButton
									onTouchTap={(event) => this.handleTouchTap(event)}
									label={<i className="fa fa-bars fa-2x" aria-hidden="true" style={{ marginTop: '20px' }}></i>}
									style={{ height: '70px' }}
								/>
								<Popover
									open={this.state.open}
									anchorEl={this.state.anchorEl}
									anchorOrigin={{ "horizontal": "left", "vertical": "bottom" }}
									targetOrigin={{ "horizontal": "right", "vertical": "top" }}
									onRequestClose={(event) => this.handleRequestClose(event)}
								>
									<Menu>
										<MenuItem
											primaryText="Conheça o Crodity"
											onTouchTap={(event) => this.scrollToBegin(event)}
										/>
										<MenuItem
											primaryText="Apresentação"
											onTouchTap={(event) => this.scrollToMiddle(event)}
										/>
										<MenuItem
											primaryText="Nossos planos"
											onTouchTap={(event) => this.scrollToBottom(event)}
										/>
										<Divider />
										<Subheader>Login</Subheader>
										<MenuItem
											primaryText={<ButtonsLoginLogin />}
											onTouchTap={(event) => this.handleRequestClose(event)}
										/>
									</Menu>
								</Popover>
							</div>)}
					</div>
					}
					style={styles.AppBar}
				/>

				<Carousel style={styles.CarouselStyle}>
					<Carousel.Item>
						{(this.state.size >= 600) ? <img width={'100%'} alt="1000x500"
							src="img/FREE"
							style={{
								display: 'block',
								margin: '0 auto'
							}} /> : <img width={'100%'} alt="1000x500"
								src="img/FREE_mobile.jpg"
								style={{
									display: 'block',
									margin: '0 auto'
								}} />}
						<Carousel.Caption style={styles.SlideTextStyle}>
							<h1 className="display-3">Free</h1>
							{(this.state.size >= 600) ?
								<h3 className="m-b-3">Experimente e se apaixone!</h3> :
								<h2 className="m-b-3" style={{ fontSize: '20px' }}>Experimente e se apaixone!</h2>}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						{(this.state.size >= 600) ? <img width={'100%'} alt="1000x500"
							src="img/DEVELOPER.jpg"
							style={{
								display: 'block',
								margin: '0 auto'
							}} /> : <img width={'100%'} alt="1000x500"
								src="img/DEVELOPER_mobile"
								style={{
									display: 'block',
									margin: '0 auto'
								}} />}
						<Carousel.Caption style={styles.SlideTextStyle}>
							<h1 className="display-3">Desenvolvedor</h1>
							{(this.state.size >= 600) ?
								<h2 className="m-b-3">Construa, colabore e ganhe!</h2> :
								<h2 className="m-b-3" style={{ fontSize: '20px' }}>Construa, colabore e ganhe!</h2>}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						{(this.state.size >= 600) ? <img width={'100%'} alt="1000x500"
							src="img/PREMIUM.jpg"
							style={{
								display: 'block',
								margin: '0 auto'
							}} /> : <img width={'100%'} alt="1000x500"
								src="img/PREMIUM_mobile.jpg"
								style={{
									display: 'block',
									margin: '0 auto'
								}} />}
						<Carousel.Caption style={styles.SlideTextStyle}>
							<h1 className="display-3">Premium</h1>
							{(this.state.size >= 600) ?
								<h2 className="m-b-3">Oportunidade de negócio e torne-se sócio do Crodity!</h2> :
								<h2 className="m-b-3" style={{ fontSize: '20px' }}>Oportunidade de negócio e torne-se sócio do Crodity!</h2>}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						{(this.state.size >= 600) ? <img width={'100%'} alt="1000x500"
							src="img/INFLUENCER2"
							style={{
								display: 'block',
								margin: '0 auto'
							}} /> : <img width={'100%'} alt="1000x500"
								src="img/INFLUENCER_mobile.jpg"
								style={{
									display: 'block',
									margin: '0 auto'
								}} />}
						<Carousel.Caption style={styles.SlideTextStyle}>
							<h1 className="display-3">Influenciador</h1>
							{(this.state.size >= 600) ?
								<h2 className="m-b-3">Torne-se influencer após conquistar as metas do Premium!</h2> :
								<h2 className="m-b-3" style={{ fontSize: '20px' }}>
									Torne-se influencer após conquistar as metas do Premium!
																			</h2>}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						{(this.state.size >= 600) ? <img width={'100%'} alt="1000x500"
							src="img/VIP.jpg"
							style={{
								display: 'block',
								margin: '0 auto'
							}} /> : <img width={'100%'} alt="1000x500"
								src="img/VIP_mobile.jpg"
								style={{
									display: 'block',
									margin: '0 auto'
								}} />}
						<Carousel.Caption style={styles.SlideTextStyle}>
							<h1 className="display-3">VIP</h1>
							{(this.state.size >= 600) ?
								<h2 className="m-b-3">Tenha um atendimento 5 estrelas e obtenha excelentes benefícios.
									<br />
									<i className="fa fa-star star-color" ></i>
									<i className="fa fa-star star-color"></i>
									<i className="fa fa-star star-color" ></i>
									<i className="fa fa-star star-color" ></i>
									<i className="fa fa-star star-color" ></i>
								</h2> :
								<h2 className="m-b-3" style={{ fontSize: '20px' }}>
									Tenha um atendimento 5 estrelas e obtenha excelentes benefícios. </h2>}
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>

				<section className="section-intro bg-faded text-xs-center text-center" ref="startDiv">
					<div className="container" style={styles.TextStyle}>
						<h3 className="wp wp-1" style={styles.MainTitle}>

							Crodity é o primeiro Social Operating System, pensado para usar redes sociais e aplicativos conectados através de um único app.
																					</h3>

						<p className="lead wp wp-2">
							Oferece aos usuários também a oportunidade de melhorar sua situação fincanceira,
																						num sistema baseado em economia colaborativa.</p>
						{/* <img src="/assets/img/mock.png" alt="iPad mock" className="img-fluid wp wp-3"/> */}
					</div>
				</section>


				{/* Features
																				================================================== */}

				<section className="section-features text-xs-center">
					<div className="container" style={styles.TextStyle}>
						<div className="row text-center">
							<div className="col-md-4">
								<div className="card" style={styles.Cards}>
									<div className="card-block">
										<i className="fa fa-3x fa-th crodity-color"></i>
										<h4 className="card-title" style={styles.TitleCards}>Apps e Redes Sociais Conectados</h4>
										<p className="card-text">App próprio e plataforma web para otimizar e mudar o UX no mundo das redes sociais unificadas e a comunicação digital, assim como criar a comunidade Crodity. Para usuários premium temos o primeiro app como
											Social Commerce onde poderá vender seus produtos </p>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="card" style={styles.Cards}>
									<div className="card-block">
										<i className="fa fa-3x fa-star star-color"></i>
										<h4 className="card-title" style={styles.TitleCards}>Rede de celebridades e Influenciadores</h4>
										<p className="card-text">Lançamento de uma comunidade, formada por celebridades e influenciadores, realização de eventos e premiação anual, descontos exclusivos e um novo lifeStyle.</p>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="card m-b-0" style={styles.Cards}>
									<div className="card-block">
										<i className="fa fa-3x fa-money money-icon"></i>
										<h4 className="card-title" style={styles.TitleCards}>Economia Colaborativa e uma ótima oportunidade de negócio</h4>
										<p className="card-text">Os usuários com melhor desempenho e Developers poderão receber ações da empresa dependendo da sua produtividade até a chegada da IPO (Initial Public Offering).</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>


				{/* Video
																					================================================== */}


				<section className="section-video text-xs-center wp wp-4">
					<h3 className="sr-only">Video</h3>
					{/* <video id="demo_video" className="video-js vjs-default-skin vjs-big-play-centered" controls poster="/assets/img/video-poster.jpg" data-setup='{}'>
																						<source src="http://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'/>
																						<source src="http://vjs.zencdn.net/v/oceans.webm" type='video/webm'/>
																						</video> */}
					<div className="row youtube-video-row" ref="middleDiv">
						<div className="youtube-video-container">
							{(this.state.size >= 600) ?
								<iframe className="youtube-video" width="600px" height='400px'
									src="https://www.youtube.com/embed/xfcNnQUPh1c?controls=1&modestbranding=1&rel=0&showinfo=0">
								</iframe> :
								<iframe className="youtube-video" width="inherit"
									src="https://www.youtube.com/embed/xfcNnQUPh1c?controls=1&modestbranding=1&rel=0&showinfo=0">
								</iframe>}

						</div>
					</div>
				</section>


				{/* Pricing
																							================================================== */}

				<section className="section-pricing bg-faded text-xs-center" ref='bottomDiv'>
					<div className="container text-center" style={styles.TextStyle}>
						<h3 style={styles.MainTitle}>Diversão e recompensa para todos</h3>


						{(this.state.size >= 600) ? <div>
							<Tabs
								onChange={(event) => this.handleChange(event)}
								value={this.state.slideIndex}
								inkBarStyle={{ backgroundColor: '#ffca43' }}
								tabItemContainerStyle={{ backgroundColor: 'white' }}
							>
								<Tab label="Grátis" value={0}
									style={{ color: 'black', fontWeight: '700' }} />
								<Tab label="Developer" value={1}
									style={{ color: 'black', fontWeight: '700' }} />
								<Tab label="Premium" value={2}
									style={{ color: 'black', fontWeight: '700' }} />
								<Tab label="Influencer" value={3}
									style={{ color: 'black', fontWeight: '700' }} />
								<Tab label="VIP" value={4}
									style={{ color: 'black', fontWeight: '700' }} />
							</Tabs>
							<SwipeableViews
								index={this.state.slideIndex}
								onChangeIndex={(event) => this.handleChange(event)}
							>
								<div style={{ marginTop: '20px', overflow: 'hidden' }}>
									<div className="container" style={styles.TextStyle}>
										<div className="row text-center">
											<div className="col-md-3">
												<img src={"img/Free.png"} width='100px' />
												<div style={{ marginTop: '10px' }}>
													Experimente e se apaixone!
																															</div>
												<div style={{
													fontWeight: '800', fontSize: '20px',
													marginTop: '20px', color: '#1c3e64'
												}}>
													Indique 5 usuários pagantes e torne-se Premium gratuitamente
																															</div>
												<div style={{ fontWeight: '800', fontSize: '20px', marginTop: '20px' }}>
													Preço: Grátis!
																															</div>
											</div>
											<div className="col-md-9">
												<List
													style={{
														padding: '4px',
														textAlign: '-webkit-left'
													}}>
													<div className="container" style={{ width: 'inherit' }}>
														<div className="row text-left">
															<div className="col-md-6">
																<ListItem
																	key={1}
																	primaryText={
																		<div>Social networks CNX *limited in 3
																																						<div style={{ fontSize: '14px', color: 'red' }}>
																				Become premium to unloke more networks</div>
																		</div>
																	}
																/>
																<ListItem
																	key={2}
																	primaryText={
																		<div>Crodity APPs *limited in 5
																																						<div style={{ fontSize: '14px', color: 'red' }}>
																				Become premium to unloke all the APPs</div>
																		</div>
																	}
																/>
																<ListItem
																	key={3}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Crodity Frame Work
																																						</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just For Developers
																																						</div>
																		</div>
																	}
																/>
																<ListItem
																	key={4}
																	primaryText="Crodity Player"
																/>
																<ListItem
																	key={5}
																	primaryText="Global Analytics"
																/>
																<ListItem
																	key={6}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Global Analytics
																																						</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																						</div>
																		</div>
																	} />
																<ListItem
																	key={7}
																	primaryText={
																		<div>
																			Number of profile views*
																																							<div style={{ fontSize: '14px', color: 'red' }}>
																				Premium and plus can know who!
																																							</div>
																		</div>
																	} />
																<ListItem
																	key={8}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Lead Generation Factory and ecommerce
																																								</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																								</div>
																		</div>
																	} />
															</div>
															<div className="col-md-6">
																<ListItem
																	key={9}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Management vote about new company strategies
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={10}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Board Member vote
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just for VIP members
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={11}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Crodity Awards
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={12}
																	primaryText="Help NGOs"
																/>
																<ListItem
																	key={13}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Will received shares of Crodity* Reward! Crowdfunding Reverse
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={14}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Direct Sales Affiliate!
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={15}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Bonus Team Upline
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Become Premium to unlock
																																									</div>
																		</div>
																	}
																/>
															</div>
														</div>
													</div>
												</List>
											</div>
										</div>
									</div>
								</div>
								<div style={{ marginTop: '20px', overflow: 'hidden' }}>
									<div className="container" style={styles.TextStyle}>
										<div className="row text-center">
											<div className="col-md-3">
												<img src={"img/Developer.png"} width='100px' />
												<div style={{ marginTop: '10px' }}>
													Construa, colabore e ganhe!
																																		</div>
												<div style={{
													fontWeight: '800', fontSize: '20px',
													marginTop: '20px', color: 'black'
												}}>
													Ganhe a partir dos APPs aprovados no Crodity, dos usuários que os usam
																																			e 20% da assinatura de cada usuário premium indicado
																																		</div>
												<div style={{ fontWeight: '800', fontSize: '20px', marginTop: '20px' }}>
													`
																																		</div>
											</div>
											<div className="col-md-9">
												<List
													style={{
														padding: '4px',
														textAlign: '-webkit-left'
													}}>
													<div className="container" style={{ width: 'inherit' }}>
														<div className="row text-left">
															<div className="col-md-6">
																<ListItem
																	key={1}
																	primaryText="Social networks CNX"
																/>
																<ListItem
																	key={2}
																	primaryText="Crodity APPs"
																/>
																<ListItem
																	key={3}
																	primaryText="Crodity Frame Work"
																/>
																<ListItem
																	key={4}
																	primaryText="Crodity Player"
																/>
																<ListItem
																	key={5}
																	primaryText="Global Analytics"
																/>
																<ListItem
																	key={6}
																	primaryText="Back Office"
																/>
																<ListItem
																	key={7}
																	primaryText={
																		<div>
																			<div>
																				Profile views
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				You can know who!
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={8}
																	primaryText="Lead Generation Factory and ecommerce"
																/>
															</div>
															<div className="col-md-6">
																<ListItem
																	key={9}
																	primaryText="Management vote about new company strategies"
																/>
																<ListItem
																	key={10}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Board Member vote
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just for VIP members
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={11}
																	primaryText={
																		<div>
																			<div>
																				Crodity Awards
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				Standard discount
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={12}
																	primaryText="Help NGOs"
																/>
																<ListItem
																	key={13}
																	primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
																/>
																<ListItem
																	key={14}
																	primaryText={
																		<div>
																			<div>
																				Direct Sales Affiliate!
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				20% of the signature of each premium user indicated
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={15}
																	primaryText={
																		<div>
																			<div>
																				Bonus Team Upline
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				10% of bonus team
																																									</div>
																		</div>
																	}
																/>
															</div>
														</div>
													</div>
												</List>
											</div>
										</div>
									</div>
								</div>
								<div style={{ marginTop: '20px', overflow: 'hidden' }}>
									<div className="container" style={styles.TextStyle}>
										<div className="row text-center">
											<div className="col-md-3">
												<img src={"img/Premium.png"} width='100px' />
												<div style={{ marginTop: '10px' }}>
													Oportunidade de negócio e torne-se sócio do Crodity!
																																		</div>
												<div style={{
													fontWeight: '800', fontSize: '20px',
													marginTop: '20px', color: 'gray'
												}}>
													Direito à ecommerce, 20% da assinatura de cada usuário Premium
																																			indicado e 10% de bônus de equipe*
																																		</div>
												<div style={{ fontWeight: '800', fontSize: '20px', marginTop: '20px' }}>
													Preço: R$49,90/mensal
																																		</div>
											</div>
											<div className="col-md-9">
												<List
													style={{
														padding: '4px',
														textAlign: '-webkit-left'
													}}>
													<div className="container" style={{ width: 'inherit' }}>
														<div className="row text-left">
															<div className="col-md-6">
																<ListItem
																	key={1}
																	primaryText="Social networks CNX"
																/>
																<ListItem
																	key={2}
																	primaryText="Crodity APPs"
																/>
																<ListItem
																	key={3}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Crodity Frame Work
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just For Developers
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={4}
																	primaryText="Crodity Player"
																/>
																<ListItem
																	key={5}
																	primaryText="Global Analytics"
																/>
																<ListItem
																	key={6}
																	primaryText="Back Office"
																/>
																<ListItem
																	key={7}
																	primaryText={
																		<div>
																			<div>
																				Profile views
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				You can know who!
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={8}
																	primaryText="Lead Generation Factory and ecommerce"
																/>
															</div>
															<div className="col-md-6">
																<ListItem
																	key={9}
																	primaryText="Management vote about new company strategies"
																/>
																<ListItem
																	key={10}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Board Member vote
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just for VIP members
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={11}
																	primaryText={
																		<div>
																			<div>
																				Crodity Awards
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				Standard discount
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={12}
																	primaryText="Help NGOs"
																/>
																<ListItem
																	key={13}
																	primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
																/>
																<ListItem
																	key={14}
																	primaryText={
																		<div>
																			<div>
																				Direct Sales Affiliate!
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				20% of the signature of each premium user indicated
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={15}
																	primaryText={
																		<div>
																			<div>
																				Bonus Team Upline
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				10% of bonus team
																																									</div>
																		</div>
																	}
																/>
															</div>
															<ListItem
																key={16}
																primaryText="O bônus de equipe é um % adicional de 15% do total gerado pelas indicações dos seus indicados até 5 níveis, conforme indicado na tabela a seguir"
															/>																															</div>
													</div>
												</List>
											</div>
										</div>
									</div>
								</div>
								<div style={{ marginTop: '20px', overflow: 'hidden' }}>
									<div className="container" style={styles.TextStyle}>
										<div className="row text-center">
											<div className="col-md-3">
												<img src={"img/Influencer.png"} width='100px' />
												<div style={{ marginTop: '10px' }}>
													Torne-se influencer após conquistar as metas do Premium!
												</div>
												<div style={{
													fontWeight: '800', fontSize: '20px',
													marginTop: '20px', color: '#c71521'
												}}>
													Direito à ecommerce, 20% da assinatura de cada usuário Premium
																																			indicado e 15% de bônus de equipe*
																																		</div>
												<div style={{ fontWeight: '800', fontSize: '20px', marginTop: '20px' }}>
													Preço: Grátis
													(a partir de 5000 usuários pagantes)
																																		</div>
											</div>
											<div className="col-md-9">
												<List
													style={{
														padding: '4px',
														textAlign: '-webkit-left'
													}}>
													<div className="container" style={{ width: 'inherit' }}>
														<div className="row text-left">
															<div className="col-md-6">
																<ListItem
																	key={1}
																	primaryText="Social networks CNX"
																/>
																<ListItem
																	key={2}
																	primaryText="Crodity APPs"
																/>
																<ListItem
																	key={3}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Crodity Frame Work
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just For Developers
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={4}
																	primaryText="Crodity Player"
																/>
																<ListItem
																	key={5}
																	primaryText="Global Analytics"
																/>
																<ListItem
																	key={6}
																	primaryText="Back Office"
																/>
																<ListItem
																	key={7}
																	primaryText={
																		<div>
																			<div>
																				Profile views
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				You can know who!
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={8}
																	primaryText="Lead Generation Factory and ecommerce"
																/>
															</div>
															<div className="col-md-6">
																<ListItem
																	key={9}
																	primaryText="Management vote about new company strategies"
																/>
																<ListItem
																	key={10}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Board Member vote
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just for VIP members
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={11}
																	primaryText={
																		<div>
																			<div>
																				Crodity Awards
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				Discount premium reservation guaranteed
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={12}
																	primaryText="Help NGOs"
																/>
																<ListItem
																	key={13}
																	primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
																/>
																<ListItem
																	key={14}
																	primaryText={
																		<div>
																			<div>
																				Direct Sales Affiliate!
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				20% of the signature of each premium user indicated
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={15}
																	primaryText={
																		<div>
																			<div>
																				Bonus Team Upline
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				15% of bonus team
																																									</div>
																		</div>
																	}
																/>
															</div>
														</div>
													</div>
												</List>
											</div>
										</div>
									</div>
								</div>
								<div style={{ marginTop: '20px', overflow: 'hidden' }}>
									<div className="container" style={styles.TextStyle}>
										<div className="row text-center">
											<div className="col-md-3">
												<img src={"img/VIP.png"} width='100px' />
												<div style={{ marginTop: '10px' }}>
													Receba um atendimento 5 estrelas e obtenha excelentes benefícios!
																																		</div>
												<div style={{
													fontWeight: '800', fontSize: '20px',
													marginTop: '20px', color: 'orange'
												}}>
													Direito à ecommerce, 15% por indicação de todos os níveis da rede
																																		</div>
												<div style={{ fontWeight: '800', fontSize: '20px', marginTop: '20px' }}>
													Preço: Grátis (10.000 usuários usuários pagantes)
																																		</div>
											</div>
											<div className="col-md-9">
												<List
													style={{
														padding: '4px',
														textAlign: '-webkit-left'
													}}>
													<div className="container" style={{ width: 'inherit' }}>
														<div className="row text-left">
															<div className="col-md-6">
																<ListItem
																	key={1}
																	primaryText="Social networks CNX"
																/>
																<ListItem
																	key={2}
																	primaryText="Crodity APPs"
																/>
																<ListItem
																	key={3}
																	primaryText={
																		<div>
																			<div style={{ textDecoration: 'line-through' }}>
																				Crodity Frame Work
																																									</div>
																			<div style={{ fontSize: '14px', color: 'red' }}>
																				Just For Developers
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={4}
																	primaryText="Crodity Player"
																/>
																<ListItem
																	key={5}
																	primaryText="Global Analytics"
																/>
																<ListItem
																	key={6}
																	primaryText="Back Office"
																/>
																<ListItem
																	key={7}
																	primaryText={
																		<div>
																			<div>
																				Profile views
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				You can know who!
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={8}
																	primaryText="Lead Generation Factory and ecommerce"
																/>
															</div>
															<div className="col-md-6">
																<ListItem
																	key={9}
																	primaryText="Management vote about new company strategies"
																/>
																<ListItem
																	key={10}
																	primaryText={
																		<div>
																			<div>
																				Board Member vote
																																									</div>
																			<div style={{ fontSize: '14px', color: 'orange' }}>
																				You are a VIP member
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={11}
																	primaryText={
																		<div>
																			<div>
																				Crodity Awards
																																									</div>
																			<div style={{ fontSize: '14px', color: 'orange' }}>
																				VIP
																																									</div>
																		</div>
																	}
																/>
																<ListItem
																	key={12}
																	primaryText="Help NGOs"
																/>
																<ListItem
																	key={13}
																	primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
																/>
																<ListItem
																	key={14}
																	primaryText={
																		<div>
																			<div>
																				Direct Sales Affiliate and bônus team!
																																									</div>
																			<div style={{ fontSize: '14px', color: 'black' }}>
																				15% of the signature of each user of all the 5 levels
																																									</div>
																		</div>
																	}
																/>
															</div>
														</div>
													</div>
												</List>

											</div>
										</div>
									</div>
								</div>
							</SwipeableViews>

							<RaisedButton
								label="Cadastre-se"
								onTouchTap={(event) => this.handleTouchTap(event)}
								backgroundColor='#ffca43'
							/>

						</div> : <div>
								{/*{this.handleChangeFab()}*/}
								<List
									style={{
										padding: '4px'
									}}>
									<ListItem
										primaryText={
											<div
												style={{ marginRight: "44px" }}>
												Grátis:
																															</div>}
										secondaryText={<div style={{ marginRight: "44px", color: '#DCDCDC' }}>
											Experimente e se apaixone!
																														</div>}
										initiallyOpen={false}
										primaryTogglesNestedList={true}
										leftIcon={<img src={"img/Free.png"} />}
										style={{
											fontWeight: '500',
											fontSize: '25px',
											backgroundColor: '#1c3e64',
											borderRadius: '50px',
											color: 'white'
										}}
										nestedItems={[
											<ListItem
												key={16}
												primaryText={
													<div>
														<div style={{
															fontWeight: '800', fontSize: '20px',
															color: '#1c3e64', lineHeight: 'initial'
														}}>
															Indique 5 usuários pagantes e torne-se Premium gratuitamente
																																		</div>
														<div style={{
															fontWeight: '800', fontSize: '20px'
															, marginTop: '20px', lineHeight: 'initial'
														}}>
															Preço: Grátis
																																		</div>
													</div>
												}
											/>,
											<ListItem
												key={1}
												primaryText={
													<div>Social networks CNX *limited in 3
																																		<div style={{ fontSize: '14px', color: 'red' }}>
															Become premium to unloke more networks</div>
													</div>
												}
											/>,
											<ListItem
												key={2}
												primaryText={
													<div>Crodity APPs *limited in 5
																																		<div style={{ fontSize: '14px', color: 'red' }}>
															Become premium to unloke all the APPs</div>
													</div>
												}
											/>,
											<ListItem
												key={3}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Crodity Frame Work
																																		</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just For Developers
																																		</div>
													</div>
												}
											/>,
											<ListItem
												key={4}
												primaryText="Crodity Player"
											/>,
											<ListItem
												key={5}
												primaryText="Global Analytics"
											/>,
											<ListItem
												key={6}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Global Analytics
																																		</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																		</div>
													</div>
												} />,
											<ListItem
												key={7}
												primaryText={
													<div>
														Number of profile views*
																																			<div style={{ fontSize: '14px', color: 'red' }}>
															Premium and plus can know who!
																																			</div>
													</div>
												} />,
											<ListItem
												key={8}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Lead Generation Factory and ecommerce
																																				</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																				</div>
													</div>
												} />,
											<ListItem
												key={9}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Management vote about new company strategies
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																					</div>
													</div>
												}
											/>,
											<ListItem
												key={10}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Board Member vote
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just for VIP members
																																					</div>
													</div>
												}
											/>,
											<ListItem
												key={11}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Crodity Awards
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																					</div>
													</div>
												}
											/>,
											<ListItem
												key={12}
												primaryText="Help NGOs"
											/>,
											<ListItem
												key={13}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Will received shares of Crodity* Reward! Crowdfunding Reverse
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																					</div>
													</div>
												}
											/>,
											<ListItem
												key={14}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Direct Sales Affiliate!
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																					</div>
													</div>
												}
											/>,
											<ListItem
												key={15}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Bonus Team Upline
																																					</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Become Premium to unlock
																																					</div>
													</div>
												}
											/>
										]}
									/>
								</List>
								<List style={{
									padding: '4px'
								}}>
									<ListItem
										primaryText={<div style={{ marginRight: "44px" }}>
											Developer
																																</div>}
										secondaryText={<div style={{ marginRight: "44px", color: '#DCDCDC' }}>
											Construa, colabore e ganhe!
																															</div>}
										initiallyOpen={false}
										primaryTogglesNestedList={true}
										leftIcon={<img src={"img/Developer.png"} />}
										style={{
											fontWeight: '500',
											fontSize: '25px',
											backgroundColor: 'black',
											borderRadius: '50px',
											color: 'white'
										}}
										nestedItems={[
											<ListItem
												key={16}
												primaryText={
													<div>
														<div style={{
															fontWeight: '800', fontSize: '20px',
															color: 'black', lineHeight: 'initial'
														}}>
															Ganhe a partir dos APPs aprovados no Crodity, dos usuários que os usam
																																				e 20% da assinatura de cada usuário premium indicado
																																			</div>
														<div style={{
															fontWeight: '800', fontSize: '20px'
															, marginTop: '20px', lineHeight: 'initial'
														}}>
															Preço: R$49,90/mês
																																			</div>
													</div>
												}
											/>,
											<ListItem
												key={1}
												primaryText="Social networks CNX"
											/>,
											<ListItem
												key={2}
												primaryText="Crodity APPs"
											/>,
											<ListItem
												key={3}
												primaryText="Crodity Frame Work"
											/>,
											<ListItem
												key={4}
												primaryText="Crodity Player"
											/>,
											<ListItem
												key={5}
												primaryText="Global Analytics"
											/>,
											<ListItem
												key={6}
												primaryText="Back Office"
											/>,
											<ListItem
												key={7}
												primaryText={
													<div>
														<div>
															Profile views
																																			</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															You can know who!
																																			</div>
													</div>
												}
											/>,
											<ListItem
												key={8}
												primaryText="Lead Generation Factory and ecommerce"
											/>,
											<ListItem
												key={9}
												primaryText="Management vote about new company strategies"
											/>,
											<ListItem
												key={10}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Board Member vote
																																			</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just for VIP members
																																			</div>
													</div>
												}
											/>,
											<ListItem
												key={11}
												primaryText={
													<div>
														<div>
															Crodity Awards
																																			</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															Standard discount
																																			</div>
													</div>
												}
											/>,
											<ListItem
												key={12}
												primaryText="Help NGOs"
											/>,
											<ListItem
												key={13}
												primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
											/>,
											<ListItem
												key={14}
												primaryText={
													<div>
														<div>
															Direct Sales Affiliate!
																																			</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															20% of the signature of each premium user indicated
																																			</div>
													</div>
												}
											/>,
											<ListItem
												key={15}
												primaryText={
													<div>
														<div>
															Bonus Team Upline
																																			</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															10% of bonus team
																																			</div>
													</div>
												}
											/>
										]}
									/>
								</List>
								<List style={{
									padding: '4px'
								}}>
									<ListItem
										primaryText={<div style={{ marginRight: "44px" }}>
											Premium
																														</div>}
										secondaryText={<div style={{ marginRight: "44px" }}>
											Oportunidade de negócio e torne-se sócio do Crodity!
																													</div>}
										initiallyOpen={false}
										primaryTogglesNestedList={true}
										leftIcon={<img src={"img/Premium.png"} />}
										style={{
											fontWeight: '500',
											fontSize: '25px',
											backgroundColor: '#a6a6a6',
											borderRadius: '50px',
											color: 'white'
										}}
										nestedItems={[
											<ListItem
												key={16}
												primaryText={
													<div>
														<div style={{
															fontWeight: '800', fontSize: '20px',
															color: 'gray', lineHeight: 'initial'
														}}>
															Direito à ecommerce, 20% da assinatura de cada usuário Premium
																																		indicado e 10% de bônus de equipe*
																																	</div>
														<div style={{
															fontWeight: '800', fontSize: '20px'
															, marginTop: '20px', lineHeight: 'initial'
														}}>
															49,90/mês
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={1}
												primaryText="Social networks CNX"
											/>,
											<ListItem
												key={2}
												primaryText="Crodity APPs"
											/>,
											<ListItem
												key={3}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Crodity Frame Work
																																	</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just For Developers
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={4}
												primaryText="Crodity Player"
											/>,
											<ListItem
												key={5}
												primaryText="Global Analytics"
											/>,
											<ListItem
												key={6}
												primaryText="Back Office"
											/>,
											<ListItem
												key={7}
												primaryText={
													<div>
														<div>
															Profile views
																																	</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															You can know who!
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={8}
												primaryText="Lead Generation Factory and ecommerce"
											/>,
											<ListItem
												key={9}
												primaryText="Management vote about new company strategies"
											/>,
											<ListItem
												key={10}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Board Member vote
																																	</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just for VIP members
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={11}
												primaryText={
													<div>
														<div>
															Crodity Awards
																																	</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															Standard discount
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={12}
												primaryText="Help NGOs"
											/>,
											<ListItem
												key={13}
												primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
											/>,
											<ListItem
												key={14}
												primaryText={
													<div>
														<div>
															Direct Sales Affiliate!
																																	</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															20% of the signature of each premium user indicated
																																	</div>
													</div>
												}
											/>,
											<ListItem
												key={15}
												primaryText={
													<div>
														<div>
															Bonus Team Upline
																																	</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															10% of bonus team
																																	</div>
													</div>
												}
											/>
										]}
									/>
								</List>
								<List style={{
									padding: '4px'
								}}>
									<ListItem
										primaryText={<div style={{ marginRight: "44px" }}>
											Influencer
																												</div>}
										secondaryText={<div style={{ marginRight: "44px", color: '#DCDCDC' }}>
											Torne-se Influencer após conquistar as metas do Premium!
																											</div>}
										initiallyOpen={false}
										primaryTogglesNestedList={true}
										leftIcon={<img src={"img/Influencer.png"} />}
										style={{
											fontWeight: '500',
											fontSize: '25px',
											backgroundColor: '#c71521',
											borderRadius: '50px',
											color: 'white'
										}}
										nestedItems={[
											<ListItem
												key={16}
												primaryText={
													<div>
														<div style={{
															fontWeight: '800', fontSize: '20px',
															color: '#c71521', lineHeight: 'initial'
														}}>
															Direito à ecommerce, 20% da assinatura de cada usuário Premium
																																indicado e 15% de bônus de equipe*
																															</div>
														<div style={{
															fontWeight: '800', fontSize: '20px'
															, marginTop: '20px', lineHeight: 'initial'
														}}>
															Preço: Grátis
													(a partir de 5000 usuários pagantes)

																															</div>
													</div>
												}
											/>,
											<ListItem
												key={1}
												primaryText="Social networks CNX"
											/>,
											<ListItem
												key={2}
												primaryText="Crodity APPs"
											/>,
											<ListItem
												key={3}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Crodity Frame Work
																															</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just For Developers
																															</div>
													</div>
												}
											/>,
											<ListItem
												key={4}
												primaryText="Crodity Player"
											/>,
											<ListItem
												key={5}
												primaryText="Global Analytics"
											/>,
											<ListItem
												key={6}
												primaryText="Back Office"
											/>,
											<ListItem
												key={7}
												primaryText={
													<div>
														<div>
															Profile views
																															</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															You can know who!
																															</div>
													</div>
												}
											/>,
											<ListItem
												key={8}
												primaryText="Lead Generation Factory and ecommerce"
											/>,
											<ListItem
												key={9}
												primaryText="Management vote about new company strategies"
											/>,
											<ListItem
												key={10}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Board Member vote
																															</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just for VIP members
																															</div>
													</div>
												}
											/>,
											<ListItem
												key={11}
												primaryText={
													<div>
														<div>
															Crodity Awards
																															</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															Discount premium reservation guaranteed
																															</div>
													</div>
												}
											/>,
											<ListItem
												key={12}
												primaryText="Help NGOs"
											/>,
											<ListItem
												key={13}
												primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
											/>,
											<ListItem
												key={14}
												primaryText={
													<div>
														<div>
															Direct Sales Affiliate!
																															</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															20% of the signature of each premium user indicated
																															</div>
													</div>
												}
											/>,
											<ListItem
												key={15}
												primaryText={
													<div>
														<div>
															Bonus Team Upline
																															</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															15% of bonus team
																															</div>
													</div>
												}
											/>
										]}
									/>
								</List>
								<List style={{
									padding: '4px'
								}}>
									<ListItem
										primaryText={<div style={{ marginRight: "44px" }}>
											VIP
																										</div>}
										secondaryText={<div style={{ marginRight: "44px" }}>
											Receba um atendimento 5 estrelas e obtenha excelentes benefícios!
																									</div>}
										initiallyOpen={false}
										primaryTogglesNestedList={true}
										leftIcon={<img src={"img/VIP.png"} />}
										style={{
											fontWeight: '500',
											fontSize: '25px',
											backgroundColor: '#facf52',
											borderRadius: '50px',
											color: 'white'
										}}
										nestedItems={[
											<ListItem
												key={16}
												primaryText={
													<div>
														<div style={{
															fontWeight: '800', fontSize: '20px',
															color: '#c71521', lineHeight: 'initial'
														}}>
															Direito à ecommerce, 15% por indicação de todos os níveis da rede
																													</div>
														<div style={{
															fontWeight: '800', fontSize: '20px'
															, marginTop: '20px', lineHeight: 'initial'
														}}>
															Preço: Grátis
													(a partir de 10000 usuários pagantes)

																													</div>
													</div>
												}
											/>,
											<ListItem
												key={1}
												primaryText="Social networks CNX"
											/>,
											<ListItem
												key={2}
												primaryText="Crodity APPs"
											/>,
											<ListItem
												key={3}
												primaryText={
													<div>
														<div style={{ textDecoration: 'line-through' }}>
															Crodity Frame Work
																													</div>
														<div style={{ fontSize: '14px', color: 'red' }}>
															Just For Developers
																													</div>
													</div>
												}
											/>,
											<ListItem
												key={4}
												primaryText="Crodity Player"
											/>,
											<ListItem
												key={5}
												primaryText="Global Analytics"
											/>,
											<ListItem
												key={6}
												primaryText="Back Office"
											/>,
											<ListItem
												key={7}
												primaryText={
													<div>
														<div>
															Profile views
																													</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															You can know who!
																													</div>
													</div>
												}
											/>,
											<ListItem
												key={8}
												primaryText="Lead Generation Factory and ecommerce"
											/>,
											<ListItem
												key={9}
												primaryText="Management vote about new company strategies"
											/>,
											<ListItem
												key={10}
												primaryText={
													<div>
														<div>
															Board Member vote
																													</div>
														<div style={{ fontSize: '14px', color: 'orange' }}>
															You are a VIP member
																													</div>
													</div>
												}
											/>,
											<ListItem
												key={11}
												primaryText={
													<div>
														<div>
															Crodity Awards
																													</div>
														<div style={{ fontSize: '14px', color: 'orange' }}>
															VIP
																													</div>
													</div>
												}
											/>,
											<ListItem
												key={12}
												primaryText="Help NGOs"
											/>,
											<ListItem
												key={13}
												primaryText="Will received shares of Crodity* Reward! Crowdfunding Reverse"
											/>,
											<ListItem
												key={14}
												primaryText={
													<div>
														<div>
															Direct Sales Affiliate and bônus team!
																													</div>
														<div style={{ fontSize: '14px', color: 'black' }}>
															15% of the signature of each user of all the 5 levels
																													</div>
													</div>
												}
											/>
										]}
									/>
								</List>
								<RaisedButton
									label="Cadastre-se"
									onTouchTap={(event) => this.handleTouchTap(event)}
									backgroundColor='#ffca43'
								/>
								
								{this.state.fab ? <FloatingActionButton style={styleFab} onTouchTap={() => this.scrollToTop()}>
									<FontIcon className="material-icons">arrow_upward</FontIcon>
								</FloatingActionButton> : ''}

							</div>}

					</div>

				</section>

				{/* Footer
																					================================================== */}

				<footer className="section-footer bg-inverse" role="contentinfo" style={{ marginTop: '30px' }}>
					<div className="container text-center">
						<div className="row">
							<div className="col-xs-12">
								<div className="media">
									<small className="media-body media-bottom">
										&copy; Crodity 2017 - Todos os direitos reservados
																										</small>
								</div>
							</div>
						</div>
					</div>
				</footer>


				<script src="/assets/js/landio.min.js"></script>

			</div>

		);
	}
}

export default Login;
