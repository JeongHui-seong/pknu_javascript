import supabase from "./supabaseClient.js";

export default class DB {
    constructor() {
        this.supabase = supabase;
        this.userInfo;
    }

    async fetchUser(id, pw) {
        try {
            let query = this.supabase.from("users").select()
            if (id) query = query.eq("user_id", id);
            if (id && pw) query = query.eq("user_id", id).eq("user_pw", pw);

            const { data } = await query;
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    async InsertUser(id, pw, name, pn) {
        try {
            const { data } = await this.supabase
                .from("users")
                .insert([{ user_id: id, user_pw: pw, user_name: name, user_phonenumber: pn }])
                .select()
        }
        catch (err) {
            console.log(err);
        }
    }

    async DBIDCheck(id) {
        this.userInfo = await this.fetchUser(id);
        if (this.userInfo.length == 0) {
            alert('아이디 사용 가능');
            return true;
        } else {
            alert('아이디 사용 불가능');
            return false;
        }
    }
}