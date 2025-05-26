import DB from "./supabase.js";

export default class Home {
    constructor(target) {
        this.target = target;
        this.db = new DB();
        this.posts = [];
    }
    
    async fetchPostData(){
        let data = await this.db.fetchPosts();

        if (data && data.length > 0){
            this.posts = data;
        } else {
            console.log("데이터 없음");
        }
    }

    template() {
        return `<div class="container">
    <div class="post_wrap">
        <ul>
            ${this.posts.length == 0 ? "<li>글 불러오는중</li>" :
                this.posts.map(post=>
                `
            <li class="post_list">
                <div class="top_wrap">
                    <button class = "id">${post.users.user_name}</button>
                    <p class = "date">
                    ${post.post_created.substring(0,4)}년 
                    ${post.post_created.substring(5,7)}월
                    ${post.post_created.substring(8,10)}일 
                    ${Number(post.post_created.substring(11,13))+9}:${post.post_created.substring(14,16)}
                    </p>
                </div>
                <div class="content_wrap">
                    <p class="content">${post.post_content.replace(/\n/g,"<br>")}</p>
                </div>
                <div class="bottom_wrap">
                    <button class="like_wrap"><img src="./src/img/svg/hearticon.svg" alt="hearticon"><p>0</p></button>
                    <button class="reply_wrap"><img src="./src/img/svg/replyicon.svg" alt="replyicon"><p>0</p></button>
                </div>
            </li>
                `
            ).join('')}
        </ul>
    </div>
</div>`
    }

    async render(target) {
        if (localStorage.getItem("username")){
            await this.fetchPostData();
        } else{
            return;
        }
        target.innerHTML = this.template();
    }
}