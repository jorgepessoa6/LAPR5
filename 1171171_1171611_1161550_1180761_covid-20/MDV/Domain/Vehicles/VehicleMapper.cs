//using MDV.Domain.WorkBlock;
using System;
namespace MDV.Domain.Vehicles
{
    public class VehicleMapper
    {
        public string Matricula { get; private set; } //sequencia alfanumerica 9 caracteres

        public string VIN { get; private set; }

        public string Tipo { get; private set; }

        public DateTime DataEntrada { get; private set; }


        public VehicleMapper(string matricula, string VIN, string tipo, DateTime dataEntrada)
        {
            this.Matricula=matricula;
            this.VIN= VIN;
            this.Tipo=tipo;
            this.DataEntrada=dataEntrada;
        }
    }
}