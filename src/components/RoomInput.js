function RoomInput(){
    return(
        <div class="form-group">
            <label for="inputRoom">Sala</label>
            <input type="text" class="form-control" id="inputRoom" aria-describedby="txthelp" placeholder="Ex.: Tech-review" />
            <small id="txthelp" class="form-text text-muted">Digite o nome da sala.</small>
        </div>
    )
}

export default RoomInput