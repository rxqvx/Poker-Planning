function CreateNick(){
    return(
        <div class="form-group">
                <label for="inputNick">Nickname</label>
                <input type="text" class="form-control" id="inputNick" aria-describedby="txthelp" placeholder="Ex.: klougod"/>
                <small id="txthelp" class="form-text text-muted">Insira o apelido que será representado na sala.</small>
        </div>
    )
}

export default CreateNick;
