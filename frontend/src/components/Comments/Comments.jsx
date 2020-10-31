import * as React from 'react';
import {withRouter} from 'react-router-dom';

class Comments extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)

        this.state = {
            articleId: '',
            userId: '',
            content: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        const userId = userConnect.userId;

        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            articleId: articleId,
            userId: userId,
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  userConnect.token;
      
        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/comments/'), requestOptions)
                .then(response => response.json())
                .then((result) => 
                    this.setState(result.data),
                    alert("Commentaire publié !")
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
        
            this.setState({
                articleId: '',
                userId: '',
                content: '',
            })
    }

    render() {
        return (<div className="post-comment">
                <form>
                    <label>Commentez :</label>
                    <input type="text" name="content" value={this.state.content} onChange={this.handleChange}></input>
                </form>
                <div className="form-submit">
                    <button className="btn btn-outline-info" onClick={this.handleSubmit}>Post</button>
                </div>
            </div>)
    };
};

export default withRouter(Comments);