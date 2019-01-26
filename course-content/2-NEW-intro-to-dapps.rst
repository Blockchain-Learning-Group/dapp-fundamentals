=======================
Introduction to React
=======================

`View Completed PRODUCT REGISTRY Demo <TODO>`_


.. important::

  In this exercise, you’re going to get a crash course on the React library by building a simple product registry and voting application.
  
  You will become familiar with the fundamentals of React front-end development and be able to build an interactive React app from scratch!

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

  .. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/course-resources/master/product-registry-01/images/01-completed-app.png

----

Stage 2: Understanding and Updating the Application
=======================================================

Open the application's code in the Sublime text editor
---------------------------------------------------------
- Open the Sublime text editor by clicking on the Sublime icon in the left dock.

- From within Sublime open the `product-registry-01` folder. 
- Click on ``File`` in the top left corner and select ``Open Folder...`` in the menu.  
- Select ``Desktop/blg/product-registry-01`` to open, and we can get to coding!

Open up the ``index.html`` file within the ``product-registry-01`` folder
------------------------------------------------------

  - View the contents of the file. 
  - Don't worry too much about what is being *linked* within the ``<head>`` of the file, the core to focus on is between the ``<body></body>`` tags beneath
  - The core of the application may be simplified to the following:

    .. code-block:: html

      <div>
        <h1>Welcome! Your first task, CHANGE ME :)</h1>
        <div id="content"></div>
      </div>
    
    - Simply a title ``<h1>`` and one ``<div>`` that contains the *content* of the application.  Remember this *content* ``<div>`` as we will see it again soon!

  - Update the title ``<h1></h1>`` where your first task is noted
  - Update the title to be **your** Product registry, for example ``Adam's Product Registry``

  - Example Code:

    .. code-block:: html

      <h1 class="ui dividing centered header">Adam's Product Registry</h1>

  - Save the file!  This may be done by selecting the File menu in the top left corner and selecting save, or with the keyboard shortcut ``ctrl + s```
  - View the updated title in the browser!  

  .. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/course-resources/master/product-registry-01/images/02-renamed-header.png

  - |solution_link|

    .. |solution_link| raw:: html

      <a href="https://github.com/Blockchain-Learning-Group/course-resources/blob/master/product-registry-01/dev-stages/index-02.html" target="_blank">Complete solution may be found here</a>


Reverting to a Blank ``app.js`` file to get started!
----------------------------------------------------
  
  - Note within the open ``index.html`` file that ``app-complete.js`` is linked in a ``<script>`` tag within the ``<body>``
  - Update this to link ``app.js`` instead of ``app-complete.js``, which is the blank template you will begin with.
  - Don't forget to save!

  - Example Code:

    .. code-block:: html

      <script
        type="text/babel"
        data-plugins="transform-class-properties"
        src="app.js"
      ></script>

  - |solution_link|

  .. |solution_link| raw:: html

    <a href="https://github.com/Blockchain-Learning-Group/course-resources/blob/master/product-registry-01/dev-stages/index-03.html" target="_blank">Complete solution may be found here</a>

Your First Component!
=========================================

.. note::

  **Components**

  - React components are entirely comprised of components. A component can be thought of as a UI element within an application, generally within your browser.
  - Components may be thought of as small self contained building blocks that may effectively be reused and combined within other to build up complete applications.
  - The layout, logic, and specific styles are all housed within the given self-contanied component.

Taking a look into ``app.js`` and a first component
----------------------------

  - The remainder of coding for this exercise will occur in the ``app.js`` file.  Go ahead and open that one up in the Sublime text editor.
  - It should contain the following *component*:

    .. code-block:: html

      class ProductRegistry extends React.Component {
        render() {
          return (
            <div className='ui unstackable items'>
              Hello, I am your first React component!
            </div>
          );
        }
      }

  - A React component is simply a JavaScript class, one which extends, or inherits from, the base React Component class
  - The ``React`` object is availble globally as the ``React`` library was in fact linked in the ``<head>`` of the ``index.html`` file: 

    .. code-block:: html

      <script src="libraries/react.js"></script>

  - The class, which we will refer to as a component moving forward, ``ProductRegistry`` has only a single function, ``render()``.  This is a required function and is
    used to determine what the component will render within the browser.
  - However, the return value doesn’t look like traditional JavaScript, and you are right as we are actually using ``JSX (JavaScript eXtension syntax)``, an extension for JavaScript. 
    JSX allows us to write the markup for our component views in a familiar, HTML-esq syntax.
  - Note the familiar looking ``<div>`` section within the return statement.  These are the elements that will be rendered in the browser.
  - Also note that although this file is now linked in your ``index.html`` it is not currently displayed in the browser. The text *"Hello, ..."* is not present
  
Rendering your component
--------------------------

  - You now have your first component defined and it is even linked in your ``index.html`` file... but it is not being rendered on the page... let's fix that.

    .. code-block:: html

      <script src="app.js"></script>

  - Remember that *content* ``<div>``?  Yes, we want to render our JSX component within that ``<div>`` on our page.  
  - Add the following lines at the bottom of your ``app.js`` file:

    .. code-block:: html

      ReactDOM.render(
        <ProductRegistry />,
        document.getElementById('content')
      );

  - Save the file and have a look at your browser. Is a warm hello from your component present?
  - Great, you have rendered your first React component!
  
  - *ReactDOM* is a package that the React library provides to essentially allow direct interaction with the elements defined in your ``index.html``.
  - Above you told React to locate the element on the current page(document) with the id *content* and to render the ``<ProductRegistry />`` component within it.
    And voila it appeared beneath your title as is defined in your ``index.html``.  
    
    Effectively resulting in the following:

    .. code-block:: html

      <div>
        <h1>Product Registry</h1>
        <div id="content">
          <ProductRegistry />
        </div>
      </div>

  .. important::

    Understanding |babel_link| and how our browser is able to understand your new JSX component.

    .. |babel_link| raw:: html

      <a href="https://babeljs.io/" target="_blank">Babel</a>

    Modern browsers' execution engines do not natively understand the JSX language.  JSX is an extension to standard JavaScript, which browsers do understand. 
    We therefore need to *translate* this JSX code to standard JavaScript so our browser can understand it.  
    Essentially your component is speaking Espanol while our browser only understands English.

    Babel is here to solve this problem for us!

    Babel is a JavaScript *transpiler*, or in more familiar English language a translator. Babel understands JSX and is capable of translating 
    your JSX into standard JavaScript.  You simply need to instruct the browser to use Babel prior to attemtping to execute the JSX code.

    The Babel library has been included in your ``index.html``:

    .. code-block:: html

      <script src="libraries/babel-standalone.js"></script>

    Finally the browser may be instructed to use Babel directly where the ``app.js`` file is linked in your ``index.html``:

      .. code-block:: html

        <script
          type="text/babel"
          data-plugins="transform-class-properties"
          src="app.js"
        ></script>

    

------------------------------------------------------
