using System;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace MDV.Domain.Generations
{
    public class Generation : Entity<GenerationId>
    {
        public List<Population> populations { get; private set; }

        private Generation()
        {
        }

        public Generation(List<Population> populations)
        {
            this.Id = new GenerationId(Guid.NewGuid());
            this.populations = populations;
        }
    }
}