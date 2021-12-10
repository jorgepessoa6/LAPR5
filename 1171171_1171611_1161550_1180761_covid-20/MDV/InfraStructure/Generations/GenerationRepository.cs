using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Generations;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDV.Infrastructure.Generations
{
    public class GenerationRepository : BaseRepository<Generation, GenerationId>, IGenerationRepository
    {

        private readonly MDVDbContext context;
        public GenerationRepository(MDVDbContext context) : base(context.Generations)
        {
                this.context = context;
        }

        public async Task<List<Population>> GetPopulations()
        {
            return await this.context.Populations.FromSqlRaw("SELECT p.* FROM [dbo].[Populations] p").ToListAsync();
        }
    }
}