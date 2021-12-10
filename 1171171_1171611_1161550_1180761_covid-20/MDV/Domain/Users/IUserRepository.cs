using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.Users
{
    public interface IUserRepository: IRepository<User,UserId>
    {
        Task<List<User>> GetUserByUsername(string username);
    }
}