using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.WorkBlocks;

namespace MDV.Domain.DriverDuties
{
    public class DriverDuty : Entity<DriverDutyId>, IAggregateRoot
    {
        public string Code { get;  private set; }

        public List<WorkBlock> WorkBlock { get; set; }

        public String RGB { get;  private set; }

        private DriverDuty()
        {
           // this.Active = true;
        }

        public DriverDuty(string code, List<WorkBlock> wb, string color)
        {
       /*      if (wb == null)
                throw new BusinessRuleValidationException("Cada servico de veiculo requer pelo menos um bloco de trabalho");
            */ this.Id = new DriverDutyId(Guid.NewGuid());
            this.Code = code;
            this.WorkBlock = wb;
            this.RGB=color;
           // this.Active = true;
        }
           public DriverDuty(string id,string code, List<WorkBlock> wb, string rgb)
        {
       /*      if (wb == null)
                throw new BusinessRuleValidationException("Cada servico de veiculo requer pelo menos um bloco de trabalho");
            */ this.Id = new DriverDutyId(Guid.Parse(id));
            this.Code = code;
            this.WorkBlock = wb;
            this.RGB=rgb;
           // this.Active = true;
        }
    }
}