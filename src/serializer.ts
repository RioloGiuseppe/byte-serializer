import Decoration from './decoration'
import BitOrder from './enums/bitOrder'

class A {
    @Decoration.position(0)
    @Decoration.lenght(5)
    @Decoration.bitOrder(BitOrder.BE)
    public Pippo:string;

    public Plutp :string
}
   
export default A
