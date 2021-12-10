using System.Threading.Tasks;

namespace MDV.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}