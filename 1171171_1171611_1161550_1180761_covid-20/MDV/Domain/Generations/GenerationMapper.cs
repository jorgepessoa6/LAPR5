using System.Collections.Generic;

namespace MDV.Domain.Generations
{
    public class GenerationMapper
    {

        public List<Population> populations { get; private set; }

        public GenerationMapper(List<Population> populations)
        {
            this.populations = populations;
        }
    }
}