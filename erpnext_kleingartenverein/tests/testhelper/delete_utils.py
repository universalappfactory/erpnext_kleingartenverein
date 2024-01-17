def try_delete(action):
    try:
        action()
    except Exception as error:
        print(error)
