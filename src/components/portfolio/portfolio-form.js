import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component'

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
// this was imported into the node modules when DZ installed


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "",
            // category: "eCommerce", could create a default here or create a "select" option in drop down
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://galenmontague.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
        //this creates a reference object and stores it in thumbRef so we have access to it in the JSX code so we can call it from any other function.
    }

    deleteImage(imageType) {
        // imageType will be a thumb or a logo, etc
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`, { withCredentials: true }
        ).then(response => {
            this.setState({
                [`${imageType}_url`]: ""
                // use [] when setting state dynamically and don't know exact name of the key. The value in this case is set to an empty string. This clears off the exiting image.
            })
        }).catch(error => {
            console.log("deleteImage error", error)
        })
        // most api's allow for optional parameters to be set (use '?')
    }

    componentDidUpdate() {
        // clicking on the edit button in the portfolio will trigger this function because we are going to populate that prop and pass in that data.
        // checking to see if the object has keys or not _(not react related)
            // ** from an exercise in the console
            // const obj1 = {};
            // const obj2 = { greeting: "asdfasdf" }
            // Object.keys(obj1).length
            // 0
            // Object.keys(obj2).length
            // 1
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            // if the object is empty, then skip below
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;
                // all stored in a local variable using desctructuring

            this.props.clearPortfolioToEdit();
                // this will go into the parent (portfolio-manager) and run clearPortfolioToEdit() so that the conditional above doesn't get fired anymore
                // the componentDidUpdate() will run everytime something is typed into the form unless we run this
            
            this.setState({
                id: id,
                name: name || "",
                    // nill check: we don't want to work with nill/null values (if there's a name, then put name, if not have an empty string)
                description: description || "",
                category: category || "",
                position: position || "",
                url: url || "",
                editMode: true,
                apiUrl: `https://galenmontague.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || ""
            });
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        };
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file })
        };
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file })
        };
    }
    
    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
                // limits file types (part of Dropzone)
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
                // We want to wait for "submit" to pass the file to the api. This creates a mock url that returns true always. Creates animations when file is accepted. This url just returns true.
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();
        //creating an empty object

        // fills the empty object (keys and values)
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);
        
        if (this.state.thumb_image) {
        formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
        
        if (this.state.banner_image) {
        formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        
        if (this.state.logo) {
        formData.append("portfolio_item[logo]", this.state.logo);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios({
            // This is a configuration object. The keys can dynamically be updated.
            // Could do separate handle submits for post and patch, but 90% of the code would be the same.
            method: this.state.apiAction,
                // Will be post if no portfolio record to edit, if there is, it will switch to patch
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
            .then(response => {
                if (this.state.editMode) {
                        // When response comes back, if in edit mode, do this.
                    this.props.handleEditFormSubmission();
                } else {
                    this.props.handleNewFormSubmission(response.data.portfolio_item);
                }
            
                this.setState = ({
                    name: "",
                    description: "",
                    category: "",
                    position: "",
                    url: "",
                    thumb_image: "",
                    banner_image: "",
                    logo: "",
                    // Resets the state back to empty string.
                    // These are attributes in the state, below are elements in the DOM.
                    editMode: false,
                    apiUrl: "https://galenmontague.devcamp.space/portfolio/portfolio_items",
                    apiAction: "post"
                });
                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles()
                    // forEach loops over each reference and gives us access to each. The first "ref" is this.thumbRef, then this.bannerRef, etc.
                    // "Current" gives us the current state of each element.
                    // This is all in Dropzone Component docs on how to remove files.
                })
            })
            .catch(error => {
                console.log("portfolio form handleSubmit error", error);
            });

            event.preventDefault();
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                    <div className="two-column">
                        <input
                            type="text"
                            name="name"
                            placeholder="Portfolio Item Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="two-column">
                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={this.state.position}
                            onChange={this.handleChange}
                        />

                        <select
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                            className="select-element"
                        >
                            <option>Select Category</option>
                            <option value="HTML/CSS">HTML/CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                            <option value="Python">Python</option>
                            {/* <option value="eCommerce">eCommerce</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Enterprise">Enterprise</option> */}
                        </select>
                    </div >

                    <div className="one-column">
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="image-uploaders">
                        {/* {true ? "do if true" : "do if false"} */}

                        {this.state.thumb_image_url && this.state.editMode ? (
                            // if there's a thumb img AND we're in edit mode
                            <div className="portfolio-manager-image-wrapper">
                                <img src={this.state.thumb_image_url} />

                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("thumb_image")}>
                                    Remove File
                                    </a>
                                </div>
                            </div>
                        )   :   ( 
                            <DropzoneComponent
                            ref = {this.thumbRef}
                                    // Allows us to place a handle in this component (or any component). Gives us the ability to interact with the real DOM.
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleThumbDrop()}
                            >
                                <div className="dz-message">Thumbnail</div>
                            </DropzoneComponent>
                        )}
                        
                        {this.state.banner_image_url && this.state.editMode ? (
                            <div className="portfolio-manager-image-wrapper">
                                <img src={this.state.banner_image_url} />

                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("banner_image")}>
                                    Remove File
                                    </a>
                                </div>
                            </div>
                        )   :   ( 
                            <DropzoneComponent
                                ref = {this.bannerRef}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleBannerDrop()}
                                >
                                <div className="dz-message">Banner</div>
                            </DropzoneComponent>
                        )}
                        
                        {this.state.logo_url && this.state.editMode ? (
                            // if there's a thumb img AND we're in edit mode
                            <div className="portfolio-manager-image-wrapper">
                                <img src={this.state.logo_url} />
                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("logo")}>
                                    Remove File
                                    </a>
                                </div>
                            </div>
                        )   :   ( 
                            <DropzoneComponent
                                ref = {this.logoRef}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleLogoDrop()}
                                >
                                <div className="dz-message">Logo</div>
                            </DropzoneComponent>
                        )}
                    </div>

                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
        )
    }
}