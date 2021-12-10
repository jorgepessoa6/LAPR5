using System;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace MDV.Domain.Vehicles
{
    public class Vehicle : Entity<VehicleId>, IAggregateRoot
    {
        public string Matricula { get; private set; } //sequencia alfanumerica 9 caracteres

        public string VIN { get; private set; }

        public string Tipo { get; private set; }

        public DateTime DataEntrada { get; private set; }

        private Vehicle()
        {

        }

        public Vehicle(string matricula, string VIN, string tipo, DateTime dataEntrada)
        {
            if (tipo == null)
                throw new BusinessRuleValidationException("Parâmetros em falta! Cada Viagem necessita de todos os campos preenchidos!");
            
            this.Id = new VehicleId(Guid.NewGuid());
            this.Matricula=matricula;
            this.VIN= VIN;
            this.Tipo=tipo;
            this.DataEntrada=dataEntrada;
        }
    }
}
