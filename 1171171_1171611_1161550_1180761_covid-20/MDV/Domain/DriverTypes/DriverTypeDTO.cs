using System;
using System.Collections.Generic;

namespace MDV.Domain.DriverTypes
{
    public class DriverTypeDTO
    {
        public Guid Id { get; set; }
       

        public List<DriverType> TipoTripulante { get; private set; }

        public DriverTypeDTO(Guid Id,List<DriverType> lstTipoTripulante)
        {
            this.Id=Id;
            this.TipoTripulante=lstTipoTripulante;
        }
    }
}