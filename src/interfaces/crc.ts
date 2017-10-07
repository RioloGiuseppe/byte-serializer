export interface CRC {
    compute(data : Array<number>): Array<number>;
}

export interface CRCMetadata{
    startByte:number;
    stopByte:number;
    length:number;
    name:string;


}