using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Users;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDV.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {

        private readonly MDVDbContext context;
        public UserRepository(MDVDbContext context) : base(context.Users)
        {
                this.context = context;
        }

        public async Task<List<User>>  GetUserByUsername(string username)
        {
            return await this.context.Users.FromSqlRaw("SELECT * FROM [dbo].[Users]  WHERE userName = '" + username + "' ").ToListAsync();
        }
    }
}