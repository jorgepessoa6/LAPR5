using System;
using MDV.Domain.Shared;
using System.Collections.Generic;



namespace MDV.Domain.DriverTypes
{
    public class DriverType : Entity<DriverTypeId>{

        public string TipoTripulante { get; private set; }


        public DriverType( string tipoTripulante)
        {
            this.Id = new DriverTypeId(Guid.NewGuid());
            this.TipoTripulante=tipoTripulante;
            
        }
    }
}
