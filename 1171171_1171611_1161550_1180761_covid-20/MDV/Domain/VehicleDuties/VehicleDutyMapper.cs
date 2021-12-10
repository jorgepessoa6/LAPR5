//using MDV.Domain.WorkBlock;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;
namespace MDV.Domain.VehicleDuties
{
    public class VehicleDutyMapper
    {
        public string Code { get;  set; }

        public string RGB { get;  set; }

      
        public List<string> WorkBlocks {get;set;}


        public VehicleDutyMapper(string code, List<string> lstWB, string rgb)
        {
            this.Code = code;
            this.WorkBlocks=lstWB;
            this.RGB=rgb;
        }
    }
}