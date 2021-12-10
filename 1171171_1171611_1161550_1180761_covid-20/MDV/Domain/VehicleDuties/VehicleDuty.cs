using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;

namespace MDV.Domain.VehicleDuties
{
    public class VehicleDuty : Entity<VehicleDutyId>, IAggregateRoot
    {
        public string Code { get;  private set; }

        public string RGB { get;  private set; }

        public List<WorkBlock> WorkBlock { get; set; }

        private VehicleDuty()
        {
           // this.Active = true;
        }

        public VehicleDuty(string code, List<WorkBlock> wb, string rgb)
        {
       /*      if (wb == null)
                throw new BusinessRuleValidationException("Cada servico de veiculo requer pelo menos um bloco de trabalho");
            */ this.Id = new VehicleDutyId(Guid.NewGuid());
            this.Code = code;
            this.WorkBlock = wb;
            this.RGB=rgb;
           // this.Active = true;
        }
        public VehicleDuty(string id,string code, List<WorkBlock> wb, string rgb)
        {
       /*      if (wb == null)
                throw new BusinessRuleValidationException("Cada servico de veiculo requer pelo menos um bloco de trabalho");
            */ this.Id = new VehicleDutyId(Guid.Parse(id));
            this.Code = code;
            this.WorkBlock = wb;
            this.RGB=rgb;
           // this.Active = true;
        }
    }
}