using System.Data;
using System.Data.SqlClient;

namespace WebApplication3.DbContext;

public interface IDbProvider
{
    public Task<SqlConnection> CreateConnectionAsync();
}

public class DbProvider : IDbProvider
{
    private readonly string _connectionString;

    public DbProvider(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<SqlConnection> CreateConnectionAsync()
    {
        var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }
}