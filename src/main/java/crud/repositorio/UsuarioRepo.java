package crud.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import crud.modelo.Usuario;

@Repository
//@RepositoryRestResource(collectionResourceRel = "us", path = "us")
//@RepositoryRestResource
public interface UsuarioRepo extends PagingAndSortingRepository<Usuario, Long>{

}
