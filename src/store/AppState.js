import { observable ,action} from "mobx";
import api from '../util/api';
import {ObjectID} from 'bson';
const APIBASE = "http://139.9.208.205:3001/"
function remove_tree_node(object, id) {
    object.children = object.children.filter(item => item._id != id);
    object.children.forEach(item => remove_tree_node(item , id));
    return object;
}
class AppState
{
    constructor()
    {
        const token = window.localStorage.getItem("FTTREE-TOKEN");
        if(token) api.setToken(token);
    }
    @observable appname = "EasyStarter";  // 应用名 
    @observable is_editing = false;  //是否正在修改
    @observable editing_id = 0;  // 修改的文章id?
    @observable search_text = "";// 
    @observable current_note_list = [];  //某node_id 下文章列表 
    @observable current_note_markdown = '';  // markdown 文字
    @observable active_id = 0;  // 选中的note id
    @observable view_type = 0;
    @action save_token(token)
    {
        window.localStorage.setItem("FTTREE-TOKEN",token);
        api.setToken(token);
    }
    @action async login(nickname, password)
    {
        let params = {};
        params['nickname'] = nickname;
        params['password'] = password;
        const {token} = await api.post(APIBASE+"login", params);
        this.save_token(token);
        return;
    }
    @action set_markdown( markdown ) 
    {
        this.current_note_markdown = markdown;
        this.is_editing = true;
        this.editing_id = 0;
    }
    @action async tree_add_node()
    {
        const new_node = {
            _id: new ObjectID(),
            module:"unnamed",
            children:[],
            collapsed: false,
            created_at: Date.now()
        };
        this.current_tree.children.push(new_node);
        await this.update_tree();
    }
    @action async init_tree(){
        var params = {};
        const data  =  await api.post( APIBASE+"nodes", params );
        if(data)
        {
            console.log(data);
            this.current_tree = data;
        }
    };
    @observable current_tree = {
        "module":"react-ui-tree",
        "children":[{
            "collapsed":true,
            "module":"dist",
            "children":[{
                "module":"node.js"
            }]
        }]
    };

    @action async save_to_node( parent_node_id , title, content, id=0)
    {
        var params = {}
        params['parent_node']= parent_node_id;
        params['title']= title;
        params['content']= content;
        params['id']= id;
        const data = await api.post(APIBASE+'notes/save', params);
        if(data && this.active_id != 0) await this.load_notes(this.active_id);
        if(data && data._id) this.editing_id = data._id;
    }

    @action async remove_note(node_id)
    {
        var params = {}
        params["id"]= node_id;
        const data = await api.post(APIBASE+ "notes/remove", params);
        if(data)
        {
            if(this.editing_id !=0)
            {
                this.load_notes(this.editing_id);
            }
            this.current_note_markdown = "";
            this.is_editing = false;
            this.editing_id = 0;
        }
        
    }
    @action async add_note()
    {
        if (this.active_id == 0) 
        {
            alert("请先选择某个节点");
            return ;
        }
        var params = {}
        params['parent_node']= this.active_d;
        params['_id']= new ObjectD();
        params['title']=新笔记;
        params['content']= '';
        const data = await api.post(APIBASE + 'notes/add',params);
        console.log('add note' , data);
        this.current_note_list = data;
    }
    @action async del_note()
    {
        if(this.active_id == 0)
        {
            alert("请先选择某个节点");
            return ;
        }
        var params = {}
        params['parent_node']= this.active_id;
        params['id']= this.editing_id;
        const data = await api.post(APIBASE + "notes/delete", params)
        if(data)
        {
            console.log('delete data');
            this.current_note_list = data ; 
        }

    }
    @action async load_notes( node_id)
    {
        var params = {}
        params["parent_node"]= node_id;
        const data = await api.post( APIBASE + "notes/list", params);
        console.log('loading note', data);
        this.current_note_list = data;
    }
    @action async load_note( node_id )
    {
        var params = {}
        params["id"]= node_id;
        const data = await api.post( APIBASE + 'notes/detail', params);
        if(data && data.content)
        {
            this.current_note_markdown = data.content;
            this.editing_id = data._id;

        }
    }
    @action async search( text )
    {
        var params = {}
        params["text"]= text ;

        const data = await api.post(APIBASE+ "notes/search", params);
        if(data&& Array.isArray(data))
        {
            this.current_note_list = data;
        }
    }
    @action async update_tree( tree= null)
    {
        console.log('call_update');
        if(!tree) tree = this.current_tree;
        var params = {}
        params["tree"]= JSON.stringify(tree.children);
        const data = await api.post(APIBASE+"nodes/update",params);
        
        if(data) this.current_tree = data;
    }
    @action tree_remove_node(id)
    {
        this.current_tree = remove_tree_node({...this.current_tree}, id);//这里解包再压缩，是为了一个新的对象？
    }



}

export default new AppState();