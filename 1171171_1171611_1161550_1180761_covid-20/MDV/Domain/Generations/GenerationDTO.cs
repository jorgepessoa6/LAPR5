using System;
using System.Collections.Generic;

namespace MDV.Domain.Generations
{
    public class GenerationDTO
    {
        public Guid Id { get; set; }
        public List<Population> populations { get; set; }

        public GenerationDTO(Guid Id, List<Population> populations)
        {
            this.Id = Id;
            this.populations = populations;
        }
    }
}