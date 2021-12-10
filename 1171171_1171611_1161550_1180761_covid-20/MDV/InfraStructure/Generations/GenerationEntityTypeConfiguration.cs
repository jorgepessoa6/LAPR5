using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Generations;

namespace MDV.Infrastructure.Generations
{
    internal class GenerationEntityTypeConfiguration : IEntityTypeConfiguration<Generation>
    {
        public void Configure(EntityTypeBuilder<Generation> builder)
        {
            builder.HasKey(b => b.Id);
        }
    }
}