//using MDV.Domain.WorkBlock;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;
namespace MDV.Domain.DriverDuties
{
    public class    DriverDutyMapper
    {
        public string Code { get;  set; }

        public string RGB { get;  set; }


        //MUDAR PARA WORKBLOCKS QUADNO O JORGE DER COMMIT
        public List<string> WorkBlocks {get;set;}


        public DriverDutyMapper(string code, List<string> lstWB,string color)
        {
            this.Code = code;
            this.WorkBlocks=lstWB;
            this.RGB=color;
        }
    }
}