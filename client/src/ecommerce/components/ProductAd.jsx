import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TypeAd from './TypeAd.jsx';
import ProductTitle from './ProductTitle.jsx';
import ProductStatus from './ProductStatus.jsx';
import ProductPrice from './ProductPrice.jsx';
import DeliveryOptions from './DeliveryOptions.jsx';
import ProductReview from './ProductReview.jsx';
import PaymentMethods from './PaymentMethods.jsx';
import AdSubCategory from './AdSubCategory.jsx';
import Tracker from './Tracker.jsx';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Product from './Product.jsx';
import config from '/imports/api/enum.js'
import FileUploader from '../../helpers/FileUploader.jsx'
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router'
import NewPost from './NewPost.jsx';
import { Helpers } from '../../helpers/Helpers.jsx';
import Checkbox from 'material-ui/Checkbox';
import URLs from '../../helpers/URLs.js'

class ProductAd extends Component {
    constructor(props) {
        super(props);

        this.style = {
            block: {
                maxWidth: 250
            }
        }

        this.state = {
            stepIndex: 0,
            category: '',
            subCategory: '',
            title: '',
            description: '',
            price: 0.0,
            deliveryOptions: config.deliveryOptions,
            paymentMethods: config.paymentMethods,
            imagesLinks: [],
            formValue: 0,
            status: 'Novo',
            creditCard: true,
            debitCard: false,
            bankSlip: false,
            installments: [],
            quantity: 1,
            open: false,
            ad: {
                category: '',
                subCategory: '',
                imageUrl: '',
                title: '',
                description: '',
                price: 0,
                delivery_options: [],
                status: '',
                payment_methods: [],
                installments: [],
                quantity: 0
            },
            address: {
                street: 'Rua Estados Unidos',
                number: '402',
                neighborhood: 'Bela Vista',
                city: 'São Paulo',
                State: 'São Paulo'
            },
            productId: '',
            images64: []
        }
    }

    handleTitle() {
        const { title } = this.state;
    }

    handleNext(input, input1) {
        //input1 is used on step 5 when we have installments
        console.log('Conteudo recebido no input = ')
        console.log(input);
        console.log('Conteudo recebido no input1 = ')
        console.log(input1);
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 7
        });

        if (stepIndex == 0) {//Category
            this.setState({ category: input });
            console.log('Category = ' + this.state.category);
        }

        if (stepIndex == 1) {//Sub Category
            this.setState({ subCategory: input });
            console.log('Sub Category = ' + this.state.subCategory);
        }

        if (stepIndex == 2) {//Photos
            console.log('imagesLinks = ', this.state.imagesLinks)
        }

        if (stepIndex == 3) { //Title And Description
            this.setState({ title: input[0] });
            this.setState({ description: input[1] });
        }

        if (stepIndex == 4) { //Status
            this.setState({ status: input });
            console.log('Status = ' + this.state.status);
        }

        if (stepIndex == 5) { //Payment Methods
            this.setState({ paymentMethods: input }, () => console.log(this.state.paymentMethods))
            this.setState({ installments: input1 }, () => console.log(this.state.installments))
        }

        if (stepIndex == 6) { //Quantity and unit's price
            this.setState({ price: input });
            this.setState({ quantity: input1 });
            console.log('Price = ' + this.state.price);
        }

        if (stepIndex == 7) { //Delivery Options

            console.log('input no delivery Options = ')
            console.log(input);

            console.log('Ola mundo, THALLES VOCE É FODA! ', input1)

            let self = this;

            this.setState({
                ad: {
                    category: this.state.subCategory,
                    title: this.state.title,
                    description: this.state.description,
                    price: this.state.price,
                    delivery_options: input,
                    package_info: input1,
                    images: this.state.imagesLinks,
                    status: this.state.status,
                    payment_methods: this.state.paymentMethods,
                    installments: this.state.installments,
                    quantity: this.state.quantity
                }
            })

        }
    }

    handlePrev() {

        const { stepIndex } = this.state;

        if (stepIndex > 0)
            this.setState({ stepIndex: stepIndex - 1 })

    }

    handleImagesLinks(array) {

        let images = this.state.imagesLinks
        images = images.concat(array)

        this.setState({ imagesLinks: images }, () => { console.log('links recebidos = ', array) })
    }

    componentDidMount() {
        console.log(this.state.paymentMethods)
    }

    handlePublishOpen() {
        Meteor.call('addNewAd', this.state.ad, (e, r) => {
            if (!e)
                this.setState({ productId: r })
            console.log('result = ', r)
        })
        //Opens the confirmation dialog
        this.setState({ open: true })
    }

    handlePublishClose() {
        //Closes the confirmation dialog
        console.log('TESTE = ')
        console.log(URLs.URLs.homePage)
        console.log(URLs.URLs.adPage)
        this.setState({ open: false })
        console.log('state open = ')
        console.log(this.state.open)
        this.props.router.push("/my-ads")
    }

    convertImageFiles64(file) {
        console.log('ConvertImageFiles64()')
        console.log('file received = ', file)
        let img_64
        let self = this
        //========================================================

        //Here I use the FileReader to read the image and convert to 64 base
        let reader = new FileReader();
        reader.readAsDataURL(file);

        //This is the method called after readAsDataURL
        reader.onloadend = function (e) {
            let index = reader.result.indexOf("base64,") + 7;
            img_64 = reader.result.substring(index);
            console.log('teste desse caralho!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log('image 64 desadsadsadas = ', img_64);

            //=========================================================
            let aux = []
            aux = self.state.images64
            aux.push(img_64)
            self.setState({ images64: aux }, () => console.log('images 64 = ', self.state.images64))
        }.bind(this);



    }

    renderStepActions(step) {

        return (
            <div style={{ margin: '12px 0' }}>
                {step == 8 && (
                    <RaisedButton
                        label="Publicar"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onTouchTap={() => this.handlePublishOpen()}
                        style={{ marginRight: 12 }}
                    />
                )}
                {step == 8 && (
                    <FlatButton
                        label="Voltar"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={() => this.handlePrev()}
                    />
                )}
                {step == 2 && (
                    <RaisedButton
                        label="Próximo"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onTouchTap={() => this.handleNext()}
                        style={{ marginRight: 12 }}
                    />
                )}
                {step == 2 && (
                    <FlatButton
                        label="Voltar"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={() => this.handlePrev()}
                    />
                )}
                {step == 3 && this.state.category == 'Products' && (
                    <ProductStatus
                        stepNext={this.handleNext.bind(this)}
                        stepBack={this.handlePrev.bind(this)} />
                )}
            </div>
        );

    }

    render() {

        const { stepIndex } = this.state;
        console.log(this.props, '<<----- Aqui')
        return (
            <div>
                <Stepper
                    activeStep={stepIndex}
                    linear={true}
                    orientation="vertical"
                >
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
                            Categoria
                        </StepButton>
                        <StepContent>
                            <div>
                                <TypeAd
                                    stepNext={this.handleNext.bind(this)} />
                            </div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
                            Subcategoria
                        </StepButton>
                        <StepContent>
                            <div>
                                <AdSubCategory
                                    parentCategory={this.state.category}
                                    stepNext={this.handleNext.bind(this)}
                                    stepBack={this.handlePrev.bind(this)} />
                            </div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
                            Fotos
                        </StepButton>
                        <StepContent>
                            <div style={{ width: '100%' }}>
                                <h3 style={{ textAlign: 'center', color: 'gray', fontSize: '180%', marginBottom: '10vh' }}> Adicione aqui as fotos para o seu anúncio </h3>
                            </div>
                            <FileUploader
                                imagesLinks={this.state.imagesLinks}
                                handleImagesLinks={this.handleImagesLinks.bind(this)}
                                convertImageFiles64={this.convertImageFiles64.bind(this)}
                            />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 3 })}>
                            Título e descrição do anúncio
                        </StepButton>
                        <StepContent>
                            <div>
                                <ProductTitle
                                    title={this.state.title}
                                    description={this.state.description}
                                    stepNext={this.handleNext.bind(this)}
                                    stepBack={this.handlePrev.bind(this)} />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 4 })}>
                            Status do produto
                        </StepButton>
                        <StepContent>
                            <div>
                                <ProductStatus
                                    status={this.state.status}
                                    stepNext={this.handleNext.bind(this)}
                                    stepBack={this.handlePrev.bind(this)} />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 5 })}>
                            Métodos de pagamento
                        </StepButton>
                        <StepContent>
                            <PaymentMethods
                                paymentMethods={this.state.paymentMethods}
                                stepNext={this.handleNext.bind(this)}
                                stepBack={this.handlePrev.bind(this)} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 6 })}>
                            Quantidade e preço
                        </StepButton>
                        <StepContent>
                            <div>
                                <ProductPrice
                                    price={this.state.price}
                                    quantity={this.state.quantity}
                                    formValue={this.state.formValue}
                                    stepNext={this.handleNext.bind(this)}
                                    stepBack={this.handlePrev.bind(this)} />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 7 })}>
                            Opções de entrega
                        </StepButton>
                        <StepContent>
                            <div>
                                <DeliveryOptions
                                    stepNext={this.handleNext.bind(this)}
                                    stepBack={this.handlePrev.bind(this)}
                                    deliveryOptions={this.state.deliveryOptions} />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({ stepIndex: 8 })}>
                            Publicar
                        </StepButton>
                        <StepContent>
                            <div>
                                <div style={{ margin: '12px 0px' }}>
                                    <Product //Parameters to render the ad review
                                        ad={this.state.ad}
                                        adRev={true}
                                        rev={false}
                                    />
                                    <Dialog
                                        title="Anúncio publicado"
                                        modal={false}
                                        open={this.state.open}
                                    //onRequestClose={this.handlePublishClose()}
                                    >
                                        Seu anúncio já está no Crodity.
                                        <div>
                                            <h1 style={{ marginTop: '3vh', textAlign: 'center', fontSize: '125%', marginBottom: '5vh' }}> Deseja compartilhar seu anúncio?</h1>
                                            <NewPost
                                                imagesLinks={this.state.imagesLinks}
                                                images64={this.state.images64}
                                                text={this.state.title + ', ' + this.state.status + ', ' + this.state.price + 'R$. ' + 'Acesse em ' + URLs.URLs.homePage + URLs.URLs.adPage + this.state.productId}
                                                handlePublishClose={this.handlePublishClose.bind(this)}
                                                _idAd={this.state.productId}
                                            />
                                        </div>
                                    </Dialog>
                                </div>
                                {this.renderStepActions(8)}
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}
export default withRouter(ProductAd);