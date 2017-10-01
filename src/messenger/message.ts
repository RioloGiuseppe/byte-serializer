import Serializable from './../serializer/serializable'

abstract class Message  {
    public abstract Start:number
    public abstract Head: number[]
    public abstract End?:number

    public toBytes(Data : Serializable){
        let arr = new Array<number>();
        arr.push(this.Start)
        arr.push(... this.Head);
        arr.push(... (<Array<number>><any>Data.serialize()));
        if(typeof(this.End)==="number")
            arr.push(this.End);
        return Buffer.from(arr);
    }

}

export default Message;