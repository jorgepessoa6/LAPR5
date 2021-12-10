//using MDV.Domain.WorkBlock;
using System;
using System.Collections.Generic;

namespace MDV.Domain.DriverTypes
{
    public class DriverTypeMapper
    {
        public string TipoTripulante { get; private set; }



        public DriverTypeMapper(string TipoTripulante)
        {
           
            this.TipoTripulante=TipoTripulante;
        }
    }
}