
namespace MDV.Domain.Users
{
    public class UserMapper
    {

        public string userName { get; set; }

        public string email { get; set; }

        public string firstName { get; set; }

        public string password { get; set; }

        public string UserType { get; set; }

        public UserMapper(string userName, string email, string firstName, string password, string UserType)
        {
            this.userName = userName;
            this.email = email;
            this.firstName = firstName;
            this.password = password;
            this.UserType = UserType;
        }
    }
}
