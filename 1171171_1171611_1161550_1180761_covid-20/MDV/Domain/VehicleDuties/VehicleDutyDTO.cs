using System;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;
namespace MDV.Domain.VehicleDuties
{
    public class VehicleDutyDTO
    {
        public Guid Id { get; set; }
        public string Code { get;  set; }
        public string RGB { get;  set; }

         //MUDAR PARA WORKBLOCKS QUADNO O JORGE DER COMMIT
        public List<WorkBlock> WorkBlocks {get;set;}

        public VehicleDutyDTO(Guid Id,string code, List<WorkBlock> lstWB, string rgb)
        {
            this.Id=Id;
            this.Code = code;
            this.WorkBlocks=lstWB;
            this.RGB=rgb;

        }
    }
}