using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;

namespace MDV.Domain.Users
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<UserDTO> AddAsync(UserMapper dto)
        {

            var user = new User(dto.userName, dto.email, dto.firstName, dto.password, dto.UserType);

            await this._repo.AddAsync(user);

            await this._unitOfWork.CommitAsync();

            return new UserDTO(user.Id.AsGuid(), user.userName, user.email, user.firstName, user.password, user.UserType);
        }


        public async Task<UserDTO> GetByIdAsync(UserId id)
        {
            var vs = await this._repo.GetByIdAsync(id);

            if (vs == null)
                return null;

            return new UserDTO(vs.Id.AsGuid(), vs.userName, vs.email, vs.firstName, vs.password, vs.UserType);
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            var vs = await this._repo.GetAllAsync();
            if (vs == null)
                return null;
            var listDTOs = new List<UserDTO>();
            foreach (var item in vs)
            {
                var dto = new UserDTO(item.Id.AsGuid(), item.userName, item.email, item.firstName, item.password, item.UserType);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        public async Task<UserDTO> DeleteUser(string username)
        {
            Console.WriteLine(username);
            var item = await this._repo.GetUserByUsername(username);
            Console.WriteLine(item);

            this._repo.Remove(item[0]);

            await this._unitOfWork.CommitAsync();
            return new UserDTO(item[0].Id.AsGuid(), item[0].userName, item[0].email, item[0].firstName, item[0].password, item[0].UserType);
        }

        public async Task<UserDTO> GetUserByUsername(string username)
        {
            var item = await this._repo.GetUserByUsername(username);
            foreach (var user in item)
            {
                return new UserDTO(user.Id.AsGuid(), user.userName, user.email, user.firstName, user.password, user.UserType);
            }
                return null;
        }
    }
}