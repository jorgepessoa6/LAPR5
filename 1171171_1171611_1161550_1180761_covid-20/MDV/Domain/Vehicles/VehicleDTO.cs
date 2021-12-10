using System;
using System.Collections.Generic;
namespace MDV.Domain.Vehicles
{
    public class VehicleDTO
    {
        public Guid Id { get; set; }
        public string Matricula { get; private set; } //sequencia alfanumerica 9 caracteres

        public string VIN { get; private set; }

        public string Tipo { get; private set; }

        public DateTime DataEntrada { get; private set; }

        public VehicleDTO(Guid Id,string matricula, string VIN, string tipo, DateTime dataEntrada)
        {
            this.Id=Id;
            this.Matricula=matricula;
            this.VIN= VIN;
            this.Tipo=tipo;
            this.DataEntrada=dataEntrada;
        }
    }
}