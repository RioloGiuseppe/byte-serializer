import Serializable from './../serializer/serializable'

abstract class Message  {
    public abstract start:number
    public abstract head: number[]
    public abstract end?:number
    public length: number;

    public toBytes(Data : Serializable){
        let arr = new Array<number>();
        arr.push(this.start)
        arr.push(... this.head);
        arr.push(... (<Array<number>><any>Data.serialize()));
        if(typeof(this.end)==="number")
            arr.push(this.end);
        return Buffer.from(arr);
    }

}

export default Message;