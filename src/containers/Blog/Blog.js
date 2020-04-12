import React, {Component} from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios';
class Blog extends Component {
    state= {
        posts:[],
        selectedID:null,
        error:false
    }
    componentDidMount()
    {
        Axios.get('/posts')
        .then(Response=>{
            const posts=Response.data.slice(0,5);
            const updatedPost=posts.map(post=>{
                return{
                    ...post,
                    author:'ABC'
                }
            });
              this.setState({posts:updatedPost})
        })
        .catch(error=>{
            this.setState({error:true});
        })
    }
   postSelectedHandler=(id)=>
   {
         this.setState({selectedID:id})
   }

    render () {
        let posts=<p>Something went wrong</p>;
        if(!this.state.error)
        {
         posts = this.state.posts.map(post=>{
            return <Post
            key={post.id} 
            title={post.title} 
            author={post.author}
            clicked={()=>this.postSelectedHandler(post.id)}/>
        
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}
}

export default Blog;