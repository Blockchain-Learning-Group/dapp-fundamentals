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

1. Open a new terminal window
-----------------------------

  - Click on the terminal icon in the left dock

2. Start the app
-----------------

  2.1 Change directory into the ``blg/product-registry-01`` folder on the Desktop
    .. code-block:: bash

      cd Desktop/blg/product-registry-01

  2.2 Start the server
    .. code-block:: bash

      npm start

- *Example output:*

.. code-block:: console

  ajl@x1c:~/Desktop/blg/product-registry-01$ npm start

  > product-registry-01@1.0.0 start /home/ajl/Desktop/blg/product-registry-01
  > live-server --host=localhost --port=3000 --middleware=./libraries/disable-browser-cache.js

  Serving "/home/ajl/Desktop/blg/product-registry-01" at http://localhost:3000 (http://127.0.0.1:3000)
  Ready for changes

**- Chrome should automatically be opened and the application rendered!**

3. Open the application's code in the Sublime text editor
---------------------------------------------------------
- Open the Sublime text editor by clicking on the Sublime icon in the left dock.

- From within Sublime open the `product` folder. Click on ``File`` in the top left corner and select ``Open Folder...`` in the menu.  Select ``Desktop/blg/product-registry-01`` to open, and we can get to coding!

**END Stage 1: Starting the Application!**

----

