import ILinePathDTO from '../../dto/LinePath/linePathDTO';
import { LinePath } from '../linePath';
describe('Create a valid linePath', () => {
    var linePathID = "LinePath";
    var key = "Path";
    var orientation = null;

    
    var linePath = LinePath.create( {idLinha:"Linha:1", linePathID: "LinePath", orientation:null,key:'Path', isEmpty:false,pathNodes: []}).getValue();
     it("ensure all Parameters are well formed", () => {
        expect(linePath.key).toEqual(linePathID);
    }); 
    it("ensure all Parameters are well formed", () => {
        expect(linePath.path).toEqual(key);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linePath.orientation).toEqual(orientation);
    });
});