using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

using MM.Entities;
using MM.Contracts;

namespace MM.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext ApplicationContext { get; set; }

        public RepositoryBase(RepositoryContext repositoryContext) => ApplicationContext = repositoryContext;

        public void Create(T entity) => ApplicationContext.Set<T>().Add(entity);

        public void Delete(T entity) => ApplicationContext.Set<T>().Remove(entity);

        public IQueryable<T> FindAll() => ApplicationContext.Set<T>().AsNoTracking();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) =>
            ApplicationContext.Set<T>().Where(expression).AsNoTracking();

        public void Update(T entity) => ApplicationContext.Set<T>().Update(entity);
    }
}
