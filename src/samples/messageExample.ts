import Message from './../messenger/message'

class MessageExample extends Message{
    public start: number = 0x01;
    public head: number[] = [0x02,0x03,0x04,0x05]
    public end: number = 0xFF
}

export default MessageExample