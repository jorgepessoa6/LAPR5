using System;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;
namespace MDV.Domain.DriverDuties
{
    public class DriverDutyDTO
    {
        public Guid Id { get; set; }
        public string Code { get;  set; }
         public string RGB { get;  set; }

         //MUDAR PARA WORKBLOCKS QUADNO O JORGE DER COMMIT
        public List<WorkBlock> WorkBlocks {get;set;}

        public DriverDutyDTO(Guid Id,string code, List<WorkBlock> lstWB, string color)
        {
            this.Id=Id;
            this.Code = code;
            this.WorkBlocks=lstWB;
            this.RGB =color;
        }
    }
}