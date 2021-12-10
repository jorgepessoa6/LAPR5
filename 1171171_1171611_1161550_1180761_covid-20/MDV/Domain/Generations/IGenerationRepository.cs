using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.Generations
{
    public interface IGenerationRepository: IRepository<Generation,GenerationId>
    {
        Task<List<Population>> GetPopulations();
    }
}