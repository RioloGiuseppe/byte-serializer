import Message from './../messenger/message'

class MessageExample extends Message{
    public Start: number = 0x01;
    public Head: number[] = [0x02,0x03,0x04,0x05]
    public End: number = 0xFF
}

export default MessageExample