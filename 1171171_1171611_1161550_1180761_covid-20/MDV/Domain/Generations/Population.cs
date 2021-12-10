using System;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace MDV.Domain.Generations
{
    public class Population : Entity<PopulationId>
    {
        public string Populations { get; private set; }

        public int Order { get; private set; }

        public int OrderGen { get; private set; }

        private Population()
        {
        }

        public Population(string populations, int order, int orderGen)
        {
            this.Id = new PopulationId(Guid.NewGuid());
            this.Populations = populations;
            this.Order = order;
            this.OrderGen = orderGen;
        }
    }
}