import swal from 'sweetalert2';

export class Swal {
  public error(titulo: string, descripcion: string) {
    swal.fire({
      type: 'error',
      title: titulo,
      text: 'Error: ' + descripcion,
      showConfirmButton: false,
      timer: 4000,
      backdrop: true,
    });
  }

  public success(titulo: string, descripcion: string) {
    swal.fire({
      type: 'success',
      title: titulo,
      text: descripcion,
      showConfirmButton: false,
      timer: 4000,
      backdrop: true,
    });
  }

  public warning(
    titulo: string,
    descripcion: string,
    confirmationButtonText: string,
    funcionAcepta: any,
    funcionDeclina: any = null,
  ) {
    swal
      .fire({
        title: titulo,
        text: descripcion,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        confirmButtonText: confirmationButtonText,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      })
      .then((result: any) => {
        if (result.value) {
          funcionAcepta();
        } else {
          if (funcionDeclina != null) {
            funcionDeclina();
          }
        }
      });
  }
}
