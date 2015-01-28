package crud.controladores;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UriComponentsBuilder;

import crud.controladores.event.PaginatedResultsRetrievedEvent;
import crud.modelo.Usuario;
import crud.servicos.UsuarioServico;

/**
 * Controlador usando a api do spring MVC
 * 
 * @author Torquato
 *
 */
@Controller
@RequestMapping("/usuario")
public class UsuarioControl {

	private static final String JSON = MediaType.APPLICATION_JSON_VALUE;

	@Autowired
	private ApplicationEventPublisher eventPublisher;

	@Autowired
	private UsuarioServico usuarioServico;

	@RequestMapping(method = RequestMethod.GET, produces = JSON)
	public ResponseEntity<List<Usuario>> listAll() {
		return new ResponseEntity<List<Usuario>>(usuarioServico.listar(),
				HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, params = { "page", "size" }, produces = JSON)
	public ResponseEntity<List<Usuario>> listPage(
			@RequestParam("page") int page, @RequestParam("size") int size) {

		Page<Usuario> resultPage = usuarioServico.recuperar(page, size, Direction.DESC, "id");
		if (page > resultPage.getTotalPages()) {
			throw new ResourceNotFoundException();
		}

//		eventPublisher
//				.publishEvent(new PaginatedResultsRetrievedEvent<Usuario>(
//						Usuario.class, uriBuilder, response, page, resultPage
//								.getTotalPages(), size));

		MultiValueMap<String, String> header = new HttpHeaders();
		header.add("total", String.valueOf(resultPage.getTotalElements()));
		return new ResponseEntity<List<Usuario>>(resultPage.getContent(),header,
				HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = JSON)
	public ResponseEntity<Usuario> find(@PathVariable("id") Long id) {
		return new ResponseEntity<Usuario>(usuarioServico.recuperar(id),
				HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = JSON)
	@ResponseBody
	public void adicionar(@RequestBody Usuario usuario) {
		usuarioServico.salvarUsuario(usuario);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = JSON)
	@ResponseBody
	public void atualizar(@PathVariable("id") Long id,
			@RequestBody Usuario usuario) {
		usuarioServico.salvarUsuario(usuario);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletar(@PathVariable("id") Long id) {
		usuarioServico.deletarUsuario(id);
	}

}

/*
 * @RequestMapping( value = "admin/foo",params = { "page", "size" },method = GET
 * )
 * 
 * @ResponseBody public List< Foo > findPaginated(
 * 
 * @RequestParam( "page" ) int page, @RequestParam( "size" ) int size,
 * UriComponentsBuilder uriBuilder, HttpServletResponse response ){
 * 
 * Page< Foo > resultPage = service.findPaginated( page, size ); if( page >
 * resultPage.getTotalPages() ){ throw new ResourceNotFoundException(); }
 * eventPublisher.publishEvent( new PaginatedResultsRetrievedEvent< Foo > (
 * Foo.class, uriBuilder, response, page, resultPage.getTotalPages(), size ) );
 * 
 * return resultPage.getContent(); }
 */