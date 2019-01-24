=======================
Introduction to DApp Development
=======================

`View Completed PRODUCT REGISTRY Demo <TODO>`_

----

Stage 1: Starting the Application
=======================================================

.. note::

  Begin instructions from within the VM(via VirtualBox) that was configured and run in `step 6 of the prerequisites <https://blg-dapp-fundamentals.readthedocs.io/en/blg-school-hack-4-change/course-content/prerequisites/general.html#start-the-vm>`_.

`Video Tutorial [1-2] <todo>`_

Open a new terminal window
-----------------------------

  - Click on the terminal icon in the left dock

Start the app
-----------------

  - Change directory into the ``blg/product-registry-01`` folder on the Desktop
    
    .. code-block:: bash

      cd Desktop/blg/product-registry-01

  - Start the server
    
    .. code-block:: bash

      npm start

  - *Example output:*

    .. code-block:: console

      ajl@x1c:~/Desktop/blg/product-registry-01$ npm start

      > product-registry-01@1.0.0 start /home/ajl/Desktop/blg/product-registry-01
      > live-server --host=localhost --port=3000 --middleware=./libraries/disable-browser-cache.js

      Serving "/home/ajl/Desktop/blg/product-registry-01" at http://localhost:3000 (http://127.0.0.1:3000)
      Ready for changes

  - Chrome should automatically be opened and the application rendered!  Otherwise navigate to http://localhost:3000 in your browser.  
    You should see some basic text and your first task!

  .. image:: product-registry-01-01-starter-image.png
      :target: https://github.com/Blockchain-Learning-Group/course-resources/raw/master/images/product-registry-01-01-starter-image.png

----

Stage 2: Understanding and Updating the Application
=======================================================

Open the application's code in the Sublime text editor
---------------------------------------------------------
- Open the Sublime text editor by clicking on the Sublime icon in the left dock.

- From within Sublime open the `product` folder. Click on ``File`` in the top left corner and select ``Open Folder...`` in the menu.  
  Select ``Desktop/blg/product-registry-01`` to open, and we can get to coding!
